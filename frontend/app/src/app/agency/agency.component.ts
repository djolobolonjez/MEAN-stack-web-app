import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { Agency } from '../models/agency';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  visitWorkers() {
    let username = sessionStorage.getItem('username');
    this.commonService.getLoggedUser(username).subscribe((agency: Agency) => {
      this.router.navigate(['agency', agency.id, 'agencyUser', 'workers'])
    });
  }

}
