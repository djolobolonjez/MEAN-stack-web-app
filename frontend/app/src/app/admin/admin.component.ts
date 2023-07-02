import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

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
        openVacancies: user.openVacancies
      };
      myAgencies.push(agency);
    });
      this.agencies = myAgencies;
    });
  }

  registrationRequests: string[] = [];
  clients: User[] = [];
  agencies: Agency[] = [];

  displayClients: boolean = false;
  displayAgencies: boolean = false;

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
    this.displayClients = true;
  }

  showAgencies() {
    this.displayClients = false;
    this.displayAgencies = true;
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
