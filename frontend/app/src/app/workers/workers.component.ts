import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Worker } from '../models/worker';
import { AgencyService } from '../services/agency.service';
import { Agency } from '../models/agency';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  constructor(private agencyService: AgencyService, private commonService: CommonService,
              private route: ActivatedRoute, private adminService: AdminService,
              private router: Router, private navigationService: NavigationService) { }

  ngOnInit(): void {
    const queryParams = JSON.parse(localStorage.getItem('queryParams'));
    this.newWorker = new Worker();
    this.editedWorker = new Worker();

    this.userType = queryParams.userType;
    this.agencyId = queryParams.username;
    if (this.userType == 'agencyUser') {
      this.agencyId = queryParams.username;
      this.agencyService.getWorkers(this.agencyId).subscribe((workers: Worker[]) => {
        this.workers = workers;
      });
      this.commonService.getUserById(this.agencyId, "agency").subscribe((agency: Agency) => {
        this.openVacancies = agency.openVacancies;
      });
    } 
    else {
      this.agencyId = parseInt(localStorage.getItem('agencyId'));
      this.commonService.getLoggedUser(sessionStorage.getItem('username')).subscribe((user: User) => {
        this.requests = user.vacancyRequests;
        this.agencyService.getWorkers(this.agencyId).subscribe((workers: Worker[]) => {
          this.workers = workers;
        });
      });
    }
    
  }

  agencyId: number;
  workers: Worker[] = [];
  openVacancies: number;

  vacanciesRequested: number;

  showInput: boolean = false;
  showWorkerInput: boolean = false;
  adminForm: boolean = false;
  
  selectedWorker: Worker;
  newWorker: Worker;
  editedWorker: Worker;

  editMail: string;

  userType: string;

  requests: any[] = [];

  showInputFields() {
    this.showInput = true;
  }

  sendRequest() {
    this.showInput = false;
    if (this.vacanciesRequested > 0) {
      this.agencyService.sendVacanciesRequest(this.agencyId, this.vacanciesRequested).subscribe((resp) => {
        alert(resp['message']);
        this.commonService.refreshCurrentRoute(this.router);
      })
    }
  }

  showWorkerFields() {
    this.showWorkerInput = true;
  }

  submitWorker() {
    this.adminForm = false;
    this.showWorkerInput = false;
    this.agencyService.getWorkerId().subscribe((worker: Worker) => {
      this.newWorker.id = worker.id + 1;
      console.log(this.newWorker.id);
      this.agencyService.submitWorker(this.agencyId, this.newWorker).subscribe((resp) => {
        alert(resp['message']);
        this.agencyService.getWorkers(this.agencyId).subscribe((workers: Worker[]) => {
          this.workers = workers;
          this.commonService.refreshCurrentRoute(this.router);
        });
      });
    })
  }

  showAdminForm() {
    this.adminForm = true;
  }

  acceptVacancyRequest(name: string) {
    this.adminService.acceptVacancyRequest(name).subscribe((resp) => {
      alert(resp['message']);
      this.ngOnInit();
    });
  }
  deleteVacancyRequest(name: string) {
    this.adminService.deleteVacancyRequest(name).subscribe((resp) => {
      this.ngOnInit();
    });
  }

  editWorker(selectedWorker: Worker) {
    this.selectedWorker = selectedWorker;
    this.editMail = this.selectedWorker.email;
    this.editedWorker.email = this.selectedWorker.email;
    this.editedWorker.firstname = this.selectedWorker.firstname;
    this.editedWorker.lastname = this.selectedWorker.lastname;
    this.editedWorker.phone = this.selectedWorker.phone;
    this.editedWorker.specialization = this.selectedWorker.specialization;
  }

  workerEditSubmit() {
    this.editedWorker.agency = this.agencyId;
    this.agencyService.editWorker(this.editMail, this.editedWorker).subscribe((resp) => {
      this.agencyService.getWorkers(this.agencyId).subscribe((workers: Worker[]) => {
        this.workers = workers;
        this.selectedWorker = null;
      });
    })
  }

  deleteWorker(email: string) {
    this.agencyService.deleteWorker(email).subscribe((resp) => {
      this.agencyService.getWorkers(this.agencyId).subscribe((workers: Worker[]) => {
        this.workers = workers;
      });
    })
  }
}
