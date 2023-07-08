import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { User } from '../models/user';
import { Agency } from '../models/agency';
import { ClientService } from '../services/client.service';
import { Object } from '../models/object';
import { Job } from '../models/job';
import { AgencyService } from '../services/agency.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agency-view',
  templateUrl: './agency-view.component.html',
  styleUrls: ['./agency-view.component.css']
})
export class AgencyViewComponent implements OnInit {

  constructor(private commonService: CommonService, private clientService: ClientService,
              private agencyService: AgencyService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.agencyId = parseInt(localStorage.getItem('viewAgency'));
    this.username = sessionStorage.getItem('username');
    this.isClient = (this.username == null ? false : true);

    if (this.isClient) {
      this.commonService.getUserByUsername(this.username, "client").subscribe((user: User) => {
        this.userId = user.id;
        this.clientService.getAllObjects(this.userId).subscribe((objects: Object[]) => {
          this.objects = objects;
        });
      });
    }

    this.commonService.getUserById(this.agencyId, "agency").subscribe((user: User) => {
      this.agency = {
        id: this.agencyId,
        address: user.address,
        name: user.agencyName,
        description: user.description,
        valid: user.valid,
        openVacancies: user.openVacancies,
        profileImage: user.profilePicture,
        comments: user.comments
      };
      this.agency.comments.forEach(comment => {
        this.agencyService.getJobById(comment.jobId).subscribe((job: Job) => {
          this.commonService.getUserById(job.clientID, "client").subscribe((user: User) => {
            comment.firstname = user.firstname;
            comment.lastname = user.lastname;
          })
        })
      })
    });
  }

  agencyId: number;
  userId: number;
  agency: Agency;
  username: string;

  objects: Object[] = [];
  selectedObject: Object;
  date: string;
  
  isClient: boolean = false;
  
  isRequesting: boolean = false;

  request() {
    this.isRequesting = true;
  }

  sendRequest() {
    let job = new Job();
    this.agencyService.getJobId().subscribe((jobDB: Job) => {
      job.id = jobDB.id + 1;
      job.clientID = this.userId;
      job.objectID = this.selectedObject.id;
      job.agencyID = this.agencyId;
      console.log(this.selectedObject);
      job.completionDate = this.date;
      job.status = "requested";
      job.roomOneStatus = 'yellow';
      job.roomTwoStatus = 'yellow';
      job.roomThreeStatus = 'yellow';
      this.clientService.requestJob(job).subscribe((resp) => {
        alert(resp['message']);
        this.commonService.refreshCurrentRoute(this.router);
      });
    })
    
  }

  goBack() {
    this.location.back();
  }
}
