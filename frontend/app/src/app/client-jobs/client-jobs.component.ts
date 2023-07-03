import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { User } from '../models/user';
import { ClientService } from '../services/client.service';
import { Job } from '../models/job';
import { Object } from '../models/object';

@Component({
  selector: 'app-client-jobs',
  templateUrl: './client-jobs.component.html',
  styleUrls: ['./client-jobs.component.css']
})
export class ClientJobsComponent implements OnInit {

  constructor(private commonService: CommonService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.commonService.getUserByUsername(this.username, "client").subscribe((user:User) => {
      this.userID = user.id;
      this.clientService.getAllJobs(this.userID).subscribe((jobs: Job[]) => {
        this.allJobs = jobs;
      })
    })
  }

  username: string;
  userID: number;
  selectedJob: Job;

  selectedObject: Object;

  allJobs: Job[] = [];

  showProgress(job) {
    this.selectedJob = job;
    this.clientService.getObjectById(job.objectID).subscribe((object: Object) => {
      console.log(job.objectID);
      console.log(object);
      this.selectedObject = object;
    })
  }
}
