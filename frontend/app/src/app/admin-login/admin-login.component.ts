import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  
  loginErrorMessage: string;

  login() {
    this.adminService.login(this.username, this.password).subscribe((user: User) => {
      if (user != null) {
        if (user.type != 'admin') {
          this.loginErrorMessage = "Access violation!";
        }
        else {
          this.router.navigate(['admin']);
        }
      }
      else {
        this.loginErrorMessage = "Invalid username or password!";
      }
    })
  }

}
