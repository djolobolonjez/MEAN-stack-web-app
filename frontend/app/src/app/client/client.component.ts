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
    let queryParams = JSON.parse(localStorage.getItem('queryParams'));
    this.userType = queryParams.userType;
  }

  userType: string;
  username: string;

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
