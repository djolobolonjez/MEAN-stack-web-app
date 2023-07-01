import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // const params = this.route.firstChild?.snapshot.params;
    // if (params) {
    //   this.userType = params['userType'];
    //   this.username = params['username'];
    //   this.router.navigate(['client', this.username, this.userType, 'profile']);
    // }
    // else {
    //   this.username = sessionStorage.getItem('username');
    //   this.router.navigate(['client', this.username, 'clientUser', 'profile']);
    // }
  }

  userType: string;
  username: string;

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  showProfile() {
    let username = sessionStorage.getItem('username');
    localStorage.setItem('queryParams', JSON.stringify({'username': username, 'userType': 'clientUser'}));
    this.router.navigate(['client', 'profile']);
  }

}
