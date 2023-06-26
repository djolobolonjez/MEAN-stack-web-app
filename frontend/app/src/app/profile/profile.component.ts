import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private clientService: ClientService) { }

  firstname: string;
  lastname: string;
  email: string; 
  phone: string;

  isEditing: boolean = false;

  ngOnInit(): void {
    this.clientService.getLoggedUser(sessionStorage.getItem('username')).subscribe((user: User) => {
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.email = user.email;
      this.phone = user.phone;
    })
  }

  editUser() {
    this.isEditing = true;
  }

  applyChanges() {
    this.isEditing = false;
    let username = sessionStorage.getItem('username');

    console.log(this.phone);

    this.clientService.editUser(username, this.firstname, this.lastname, this.email, this.phone)
      .subscribe((resp) => {
        alert(resp['message']);
        this.clientService.getLoggedUser(username);
      });
  }

}
