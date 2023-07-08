import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job';
import { AgencyService } from '../services/agency.service';
import { CommonService } from '../services/common.service';
import { User } from '../models/user';
import { ClientService } from '../services/client.service';
import { Object } from '../models/object';
import { Worker } from '../models/worker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agency-jobs',
  templateUrl: './agency-jobs.component.html',
  styleUrls: ['./agency-jobs.component.css']
})
export class AgencyJobsComponent implements OnInit {

  constructor(private agencyService: AgencyService, private commonService: CommonService,
              private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.agencyId = JSON.parse(localStorage.getItem('queryParams')).username;
    this.agencyService.getRequestedJobs(this.agencyId).subscribe((jobs: Job[]) => {
      this.requestedJobs = jobs;
      this.requestedJobs.forEach((req) => {
        console.log(req.clientID);
        this.commonService.getUserById(req.clientID, "client").subscribe((user: User) => {
          req.clientInfo = user;
        });
        this.clientService.getObjectById(req.objectID).subscribe((obj: Object) => {
          console.log(req.objectID);
          req.objectInfo = obj;
        });
      })
    });
    this.agencyService.getActiveJobs(this.agencyId).subscribe((jobs: Job[]) => {
      this.activeJobs = jobs;
      this.activeJobs.forEach(job => {
        this.clientService.getObjectById(job.objectID).subscribe((obj: Object) => {
          job.numberOfRooms = obj.numberOfRooms;
        });
        this.clientService.getObjectById(job.objectID).subscribe((obj: Object) => {
          job.objectInfo = obj;
        })
        this.validJob(job).then(result => {
          job.started = result;
        });
      })
    });
    this.agencyService.getInactiveWorkers(this.agencyId).subscribe((workers: Worker[]) => {
      this.inactiveWorkers = workers;
    })
  }

  agencyId: number;

  requestedJobs: Job[] = [];

  activeJobs: Job[] = [];

  selectedJob: Job;
  selectedObject: Object;

  assignedJob: Job;
  updatedJob: Job;
  
  selectedWorkers: Worker[] = [];
  inactiveWorkers: Worker[] = [];
  roomStatus: string[] = [];

  acceptJob(req) {
    req.clicked = true;
  }

  declineJob(req, index) {
    this.agencyService.declineJob(req.id).subscribe((resp) => {
      this.requestedJobs.splice(index, 1);
      this.ngOnInit();
    })
  }

  sendOffer(req) {
    this.agencyService.sendOffer(req).subscribe((resp) => {
      this.ngOnInit();
    })
  }

  showProgress(job) {
    this.selectedJob = job;
    this.clientService.getObjectById(job.objectID).subscribe((object: Object) => {
      this.selectedObject = object;
    })
  }

  updateObject(job) {
    this.updatedJob = job;
  }

  validJob(job): Promise<boolean> {
    return new Promise((resolve) => {
      this.clientService.getObjectById(job.objectID).subscribe((object: Object) => {
        let numberOfRooms = object.numberOfRooms;
        if (numberOfRooms == 1 && job.roomOneWorkers.length >= 1) {
          resolve(true);
        }
        else if (numberOfRooms == 2 && job.roomOneWorkers.length >= 1 && job.roomTwoWorkers >= 1) {
          resolve(true);
        }
        else if (numberOfRooms == 3 && 
                job.roomOneWorkers.length >= 1 && job.roomTwoWorkers.length >= 1 && job.roomThreeWorkers.length >= 1) {
                  resolve(true);
                }
        else {
          resolve(false);
        }
      });
    })
    
  }

  getRange(numberOfRooms: number): number[] {
    return Array(numberOfRooms).fill(0).map((_, index) => index);
  }

  assignWorker(worker: Worker, job: Job, roomIndex: number) {
    if (roomIndex == 0) {
      job.roomOneWorkers.push(worker.id);
    }
    else if (roomIndex == 1) {
      job.roomTwoWorkers.push(worker.id);
    }
    else {
      job.roomThreeWorkers.push(worker.id);
    }

    this.validJob(job).then(result => {
      if (result) {
        job.roomOneStatus = job.roomTwoStatus = job.roomThreeStatus = 'red';
      }
      else {
        job.roomOneStatus = job.roomTwoStatus = job.roomThreeStatus = 'yellow';
      }

      this.agencyService.assignWorker(job, worker.id).subscribe((resp) => {
        this.commonService.refreshCurrentRoute(this.router);
      })

    });
  }

  assignWorkers(job) {
    this.assignedJob = job;
  }

  finishRoom(job, index) {
    let sourceArray: Array<number>;
    if (index == 0) {
      job.roomOneStatus = 'green';
      sourceArray = job.roomOneWorkers;
      
    }
    else if (index == 1) {
      job.roomTwoStatus = 'green';
      sourceArray = job.roomTwoWorkers;
      
    }
    else {
      job.roomThreeStatus = 'green';
      sourceArray = job.roomThreeWorkers;
      
    }

    let target: number[] = JSON.parse(JSON.stringify(sourceArray));
    
    this.agencyService.updateJob(job, target).subscribe(resp => {
      let condition = (job.numberOfRooms == 1 && job.roomOneStatus == 'green') ||
                      (job.numberOfRooms == 2 && job.roomOneStatus == 'green' && 
                      job.roomTwoStatus == 'green') ||
                      (job.numberOfRooms == 3 && job.roomOneStatus == 'green' && 
                      job.roomTwoStatus == 'green' &&
                      job.roomThreeStatus == 'green');

      if (condition) {
          this.agencyService.finishJob(job).subscribe(resp => {
          })
      }
      this.commonService.refreshCurrentRoute(this.router);
    });
  }
}
