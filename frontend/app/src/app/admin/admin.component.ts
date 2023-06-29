import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

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
    })
  }

  registrationRequests: string[] = [];
  clients: User[] = [];

  displayClients: boolean = false;

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
    this.displayClients = true;
  }

  navigateToProfile(username: string) {
    this.router.navigate(['client', username, 'adminUser', 'profile']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
