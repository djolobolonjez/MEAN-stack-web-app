import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getRegistrationRequests().subscribe((user: User) => {
      this.registrationRequests = user.requests;
    });
  }

  registrationRequests: string[] = [];

  allowRegistration(username: string) {
    this.adminService.allowRegistration(username).subscribe((resp) => {
      this.ngOnInit();
    })
  }

  denyRegistration(username: string) {
    this.adminService.denyRegistration(username).subscribe((resp) => {
      this.ngOnInit();
    })
  }
}
