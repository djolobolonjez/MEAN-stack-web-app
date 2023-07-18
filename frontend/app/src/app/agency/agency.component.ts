import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { NavigationService } from '../services/navigation.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor(private router: Router, private commonService: CommonService,
              private route: ActivatedRoute, private navigationService: NavigationService,
              private location: Location) { }

  ngOnInit(): void {
    
    this.navigationService.ngOnInit();
    
  }

  userType: string;
  id: number;
  activeChild: any;
  username: string;

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  visitWorkers() {
    this.router.navigate(['agency', 'workers']);
  }

  getUserType() {
    let queryParams = JSON.parse(localStorage.getItem('queryParams'));
    if (queryParams == null) {
      this.username = sessionStorage.getItem('username');
      this.commonService.getUserByUsername(this.username, "client").subscribe((user: User) => {
        if (user == null) {
          this.commonService.getUserByUsername(this.username, "agency").subscribe((user: User) => {
            if (user == null) {
              this.userType = 'adminUser';
            }
            else {
              this.userType = 'agencyUser';
            }
          });
        }
        else {
          this.userType = 'clientUser';
        }
      })
    }
    else {
      this.userType = queryParams.userType;
    }
    return this.userType;
  }

  goBack() {
    this.location.back();
  }
}
