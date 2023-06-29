import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Worker } from '../models/worker';
import { AgencyService } from '../services/agency.service';
import { Agency } from '../models/agency';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  constructor(private agencyService: AgencyService, private commonService: CommonService,
              private route: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.newWorker = new Worker();
      this.userType = params.get('userType');
      this.agencyId = parseInt(params.get('id'));

      if (this.userType == 'agencyUser') {
        this.agencyService.getWorkers(this.agencyId).subscribe((workers: Worker[]) => {
          this.workers = workers;
        });
        this.commonService.getUserById(this.agencyId, "agency").subscribe((agency: Agency) => {
          this.openVacancies = agency.openVacancies;
        });
      } 
      else {
        this.commonService.getLoggedUser(sessionStorage.getItem('username')).subscribe((user: User) => {
          this.requests = user.vacancyRequests;
          this.agencyService.getWorkers(this.agencyId).subscribe((workers: Worker[]) => {
            this.workers = workers;
          });
        });
      }
    });
    
  }

  agencyId: number;
  workers: Worker[] = [];
  openVacancies: number;

  vacanciesRequested: number;

  showInput: boolean = false;
  showWorkerInput: boolean = false;
  adminForm: boolean = false;
  
  newWorker: Worker;

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
      })
    }
  }

  showWorkerFields() {
    this.showWorkerInput = true;
  }

  submitWorker() {
    this.adminForm = false;
    this.showWorkerInput = false;
    this.agencyService.submitWorker(this.agencyId, this.newWorker).subscribe((resp) => {
      alert(resp['message']);
      this.agencyService.getWorkers(this.agencyId).subscribe((workers: Worker[]) => {
        console.log(workers);
        this.workers = workers;
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
}
