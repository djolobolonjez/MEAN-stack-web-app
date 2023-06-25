import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import { AgencyService } from '../services/agency.service';
import { User } from '../models/user';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private agencyService: AgencyService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.agencyService.getAllAgencies().subscribe((users: User[]) => {
      users.map((user) => {
        let agency: Agency = {
          id: user.id,
          name: user.agencyName,
          description: user.description
        };
        this.allAgencies.push(agency);
      })
    });
  }

  allAgencies: Agency[] = [];

  login(): void {
    this.router.navigate(['login']);
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
