import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { User } from '../models/user';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private router: Router, private commonService: CommonService,
              private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.ngOnInit();
  }

  userType: string;
  username: string;

  logout(): void {  
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  getUserType() {
    let queryParams = JSON.parse(localStorage.getItem('queryParams'));
    return queryParams.userType;
  }

}
