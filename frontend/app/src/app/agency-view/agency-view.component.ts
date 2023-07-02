import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { User } from '../models/user';
import { Agency } from '../models/agency';

@Component({
  selector: 'app-agency-view',
  templateUrl: './agency-view.component.html',
  styleUrls: ['./agency-view.component.css']
})
export class AgencyViewComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.agencyId = parseInt(localStorage.getItem('viewAgency'));
    this.commonService.getUserById(this.agencyId, "agency").subscribe((user: User) => {
      this.agency = {
        id: this.agencyId,
        address: user.address,
        name: user.agencyName,
        description: user.description,
        valid: user.valid,
        openVacancies: user.openVacancies,
        profileImage: user.profilePicture
      }
    });
  }

  agencyId: number;
  agency: Agency;
}
