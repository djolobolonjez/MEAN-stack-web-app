import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import { Job } from '../models/job';
import { Object } from '../models/object';
import { ClientService } from '../services/client.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router,
              private clientService: ClientService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.adminService.getRegistrationRequests().subscribe((user: User) => {
      this.registrationRequests = user.requests;
    });
    this.adminService.getAllClients().subscribe((clients: User[]) => {
      this.clients = clients;
    });
    this.adminService.getAllAgencies().subscribe((users: User[]) => {
      let myAgencies: Agency[] = [];
      users.map((user) => {
      let agency: Agency = {
        id: user.id,
        address: user.address,
        name: user.agencyName,
        description: user.description,
        valid: user.valid,
        openVacancies: user.openVacancies,
        profileImage: user.profilePicture,
        comments: user.comments
      };
      myAgencies.push(agency);
    });
      this.agencies = myAgencies;
    });
    this.adminService.getAllJobs().subscribe((jobs: Job[]) => {
      this.allJobs = jobs;
      this.allJobs.forEach(job => {
        this.commonService.getUserById(job.clientID, "client").subscribe((user: User) => {
          job.client = user;
          this.commonService.getUserById(job.agencyID, "agency").subscribe((user: User) => {
            job.agency = user;
          })
        })
      })
    })
  }

  registrationRequests: string[] = [];
  clients: User[] = [];
  agencies: Agency[] = [];

  displayClients: boolean = false;
  displayAgencies: boolean = false;
  displayJobs: boolean = false;
  
  allJobs: Job[] = [];
  selectedJob: Job;
  selectedObject: Object;

  showProgress(job) {
    this.selectedJob = job;
    this.clientService.getObjectById(job.objectID).subscribe((object: Object) => {
      this.selectedObject = object;
    })
  }
 
  allowRegistration(username: string) {
    this.adminService.allowRegistration(username).subscribe((resp) => {
      this.ngOnInit();
    });
  }

  denyRegistration(username: string) {
    this.adminService.denyRegistration(username).subscribe((resp) => {
      this.ngOnInit();
    })
  }

  showClients() {
    this.displayAgencies = false;
    this.displayJobs = false;
    this.displayClients = true;
  }

  showAgencies() {
    this.displayClients = false;
    this.displayJobs = false;
    this.displayAgencies = true;
  }

  showJobs() {
    this.displayJobs = true;
    this.displayClients = false;
    this.displayAgencies = false;
  }

  navigateToClient(username: string) {
    localStorage.setItem('user', username);
    this.router.navigate(['client', 'profile']);
  }

  navigateToAgency(id: number) {
    localStorage.setItem('agencyId', id.toString());
    this.router.navigate(['agency', 'profile']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
