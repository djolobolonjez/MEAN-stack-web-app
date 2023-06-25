import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { AgencyService } from '../services/agency.service';
import { CommonService } from '../services/common.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private clientService: ClientService, private agencyService: AgencyService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.getId().subscribe((user: User) => {
      this.id = user.id + 1;
    })
  }

  id: number;

  userType: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
  email: string;
  firstname: string;
  lastname: string;
  agencyName: string;
  address: string;
  uniqueNumber: string;
  description: string;

  passwordError: string;

  register(): void {
    if (this.password.length < 7 || this.password.length > 12) {
      this.passwordError = "Password should be between 7 and 12 characters long!";
    }
    else if (this.password != this.confirmPassword) {
      this.passwordError = "Passwords do not match!";
    }
    else if (!this.isValidPassword(this.password)) {
      this.passwordError = "Wrong password format!";
    }
    else {
      if (this.userType == "client") {
        this.clientService.register(this.id, this.username, this.password, this.phone, this.email, this.firstname, this.lastname, "client")
        .subscribe((resp) => {
          alert(resp['message']);
        })
      }
      else {
        this.agencyService.register(this.id, this.username, this.password, this.phone, this.email, this.agencyName, this.address,
          this.uniqueNumber, this.description, "agency").subscribe((resp) => {
            alert(resp['message']);
          })
      }
    }
  }

  isValidPassword(password: string) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z][A-Za-z\d@$!%*#?&]+$/;
    return regex.test(password);
  }

}
