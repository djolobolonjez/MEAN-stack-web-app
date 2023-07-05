import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job';
import { AgencyService } from '../services/agency.service';
import { CommonService } from '../services/common.service';
import { User } from '../models/user';
import { ClientService } from '../services/client.service';
import { Object } from '../models/object';

@Component({
  selector: 'app-agency-jobs',
  templateUrl: './agency-jobs.component.html',
  styleUrls: ['./agency-jobs.component.css']
})
export class AgencyJobsComponent implements OnInit {

  constructor(private agencyService: AgencyService, private commonService: CommonService,
              private clientService: ClientService) { }

  ngOnInit(): void {
    this.agencyId = JSON.parse(localStorage.getItem('queryParams')).username;
    this.agencyService.getRequestedJobs(this.agencyId).subscribe((jobs: Job[]) => {
      this.requestedJobs = jobs;
      this.fetchClientAndObjectData();
    })
  }

  agencyId: number;

  requestedJobs: Job[] = [];

  fetchClientAndObjectData() {
    this.requestedJobs.forEach((req) => {
      this.commonService.getUserById(req.clientID, "client").subscribe((user: User) => {
        req.clientInfo = user;
      });
      this.clientService.getObjectById(req.objectID).subscribe((obj: Object) => {
        req.objectInfo = obj;
      });
    })
  }

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

}
