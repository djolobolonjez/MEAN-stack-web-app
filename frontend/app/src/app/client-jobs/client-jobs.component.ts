import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { User } from '../models/user';
import { ClientService } from '../services/client.service';
import { Job } from '../models/job';
import { Object } from '../models/object';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-jobs',
  templateUrl: './client-jobs.component.html',
  styleUrls: ['./client-jobs.component.css']
})
export class ClientJobsComponent implements OnInit {

  constructor(private commonService: CommonService, private clientService: ClientService,
              private router: Router) { }

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
  selectedFilter: string = 'all';

  allJobs: Job[] = [];

  get filteredJobs(): Job[] {
    if (this.selectedFilter === 'all') {
      return this.allJobs;
    }
    return this.allJobs.filter(job => job.status === this.selectedFilter);
  }

  showProgress(job) {
    this.selectedJob = job;
    this.clientService.getObjectById(job.objectID).subscribe((object: Object) => {
      this.selectedObject = object;
    })
  }

  declineOffer(job) {
    this.clientService.declineOffer(job.id).subscribe((resp) => {
      this.ngOnInit();
    })
  }

  acceptOffer(job) {
    this.clientService.acceptOffer(job.id).subscribe((resp) => {
      this.ngOnInit();
    })
  }

  getJobRowClass(job: Job): string {
    if (job.status === 'declined') {
      return 'danger';
    } else if (job.status === 'accepted') {
      return 'success';
    } else {
      return '';
    }
  }

  payForJob(job) {
    this.clientService.payForJob(job.id).subscribe(resp => {
      this.commonService.refreshCurrentRoute(this.router);
    })
  }

  addComment(job) {
    job.showCommentInput = true;
    job.commentInput = job.comment || '';
  }

  saveComment(job) {
    job.comment = job.commentInput;
    job.showCommentInput = false;
    this.clientService.addComment(job).subscribe((resp) => {

    })
  }

  cancelComment(job) {
    job.showCommentInput = false;
  }

  addRating(job: any) {
    if (job.newRating && job.newRating >= 1 && job.newRating <= 5) {
      job.rating = job.newRating;
      job.showRatingInput = false;
      this.clientService.addRating(job).subscribe((resp) => {

      })
    }
  }
  editRating(job: any) {
    job.newRating = job.rating;
    job.showRatingInput = true;
  }

  deleteComment(job) {
    this.clientService.deleteComment(job).subscribe((resp) => {
      this.commonService.refreshCurrentRoute(this.router);
    })
    // do some magic
  }
}
