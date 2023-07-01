import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor(private router: Router, private commonService: CommonService,
              private route: ActivatedRoute, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.ngOnInit();
    const params = this.route.firstChild?.snapshot.params;
    if (params) {
      this.userType = params['userType'];
      this.id = params['id'];
      //this.router.navigate(['agency', this.id, this.userType, 'profile']);
    }
    else {
      let username = sessionStorage.getItem('username');
      this.commonService.getUserByUsername(username, "agency").subscribe((user: User) => {
        this.id = user.id;
        this.userType = 'agencyUser';
        
        //this.router.navigate(['agency', this.id, this.userType, 'profile']);
      })
    }
  }

  userType: string;
  id: number;
  activeChild: any;

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  visitWorkers() {
    let username = sessionStorage.getItem('username');
    this.commonService.getUserByUsername(username, "agency").subscribe((res) => {
      if (res == null) {
        this.userType = 'adminUser';
      }
      else {
        this.userType = 'agencyUser';
      }
      this.router.navigate(['agency', this.id, this.userType, 'workers']);
    });
  }

  showProfile() {
    let username = sessionStorage.getItem('username');
    this.commonService.getUserByUsername(username, "agency").subscribe((res) => {
      if (res == null) {
        this.userType = 'adminUser';
      }
      else {
        this.userType = 'agencyUser';
      }
      this.router.navigate(['agency', this.id, this.userType, 'profile']);
     
    });
  }

}
