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
    let username = sessionStorage.getItem('username');
    this.commonService.getUserByUsername(username, "agency").subscribe((user: User) => {
      if (user == null) {
        this.userType = 'adminUser';
      }
      else {
        this.userType = 'agencyUser';
        this.id = user.id;
      }
      localStorage.setItem('queryParams', JSON.stringify({'username': this.id, 'userType': this.userType}));
    });
  }

  userType: string;
  id: number;
  activeChild: any;

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  visitWorkers() {
    this.router.navigate(['agency', 'workers']);
  }

  showProfile() {
    this.router.navigate(['agency', 'profile']);
  }

}
