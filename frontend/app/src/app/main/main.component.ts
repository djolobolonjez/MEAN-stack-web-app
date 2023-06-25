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

  isStandardSearch: boolean = false;
  isAdvancedSearch: boolean = false;

  searchTerm: string;
  addressSearchTerm: string;
  nameSearchTerm: string;

  searchType: string;
  searchPerformed: boolean = false;
  selectedSortOption: string;

  ngOnInit(): void {
    this.agencyService.getAllAgencies().subscribe((users: User[]) => {
      this.allAgencies = this.retrieveAgencies(users);
    });
  }

  allAgencies: Agency[] = [];

  login(): void {
    this.router.navigate(['login']);
  }

  register(): void {
    this.router.navigate(['register']);
  }

  toggleSearch() {
    this.isStandardSearch = true;
    this.isAdvancedSearch = false;
  }

  toggleAdvancedSearch() {
    this.isStandardSearch = false;
    this.isAdvancedSearch = true;
  }

  retrieveAgencies(users: User[]): Agency[] {
    let agencies: Agency[] = [];
    users.map((user) => {
      let agency: Agency = {
        id: user.id,
        address: user.address,
        name: user.agencyName,
        description: user.description
      };
      agencies.push(agency);
    });
    return agencies;
  }
  search() {
    this.searchPerformed = false;
    if (this.searchType == "name") {
      this.agencyService.searchAgenciesByName(this.searchTerm).subscribe((users: User[]) => {
        this.allAgencies = this.retrieveAgencies(users);
        this.searchPerformed = true;
      })
    }
    else {
      this.agencyService.searchAgenciesByAddress(this.searchTerm).subscribe((users: User[]) => {
        this.allAgencies = this.retrieveAgencies(users);
        this.searchPerformed = true;
      })
    }
  }

  advancedSearch() {
    this.agencyService.advancedSearch(this.nameSearchTerm, this.addressSearchTerm).subscribe((users: User[]) => {
      this.allAgencies = this.retrieveAgencies(users);
    })
  }

  sortAgencies() {
    console.log(this.selectedSortOption);
    if (this.selectedSortOption == "addressAsc") {
      this.allAgencies.sort((a, b) => a.address.localeCompare(b.address));
    }
    else if (this.selectedSortOption == "addressDesc") {
      this.allAgencies.sort((a, b) => b.address.localeCompare(a.address));
    }
    else if (this.selectedSortOption == "nameAsc") {
      this.allAgencies.sort((a, b) => a.name.localeCompare(b.name)); 
    }
    else {
      this.allAgencies.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

}
