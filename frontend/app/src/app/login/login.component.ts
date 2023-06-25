import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  loginErrorMessage: string;

  login(): void {
    this.commonService.login(this.username, this.password).subscribe((user: User) => {
      if (user != null) {
        let route = user.type;
        this.router.navigate([route]);
      } 
      else {
        this.loginErrorMessage = "Invalid username or password!";
      }
    })
  }

}
