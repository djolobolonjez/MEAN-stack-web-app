import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { User } from '../models/user';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
    let username = sessionStorage.getItem('username');
    this.commonService.getUserByUsername(username, "client").subscribe((user: User) => {
      if (user == null) {
        this.userType = 'adminUser';
      }
      else {
        this.userType = 'clientUser';
      }
      localStorage.setItem('queryParams', JSON.stringify({'username': username, 'userType': this.userType}));
    })
  }

  userType: string;
  username: string;

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  showProfile() {
    this.router.navigate(['client', 'profile']);
  }

}
