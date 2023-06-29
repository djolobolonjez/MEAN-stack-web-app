import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { AgencyService } from '../services/agency.service';
import { CommonService } from '../services/common.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ImageWrapper } from '../models/image';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private clientService: ClientService, private agencyService: AgencyService,
              private commonService: CommonService, private router: Router,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageHandler = new ImageWrapper();
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

  imageHandler: ImageWrapper;
  imageBlob: string;
  imageChoosen: boolean = false;

  register(): void {
    if (this.password.length < 7 || this.password.length > 12) {
      this.passwordError = "Password should be between 7 and 12 characters long!";
    }
    else if (this.password != this.confirmPassword) {
      this.passwordError = "Passwords do not match!";
    }
    else if (!this.commonService.isValidPassword(this.password)) {
      this.passwordError = "Wrong password format!";
    }
    else {
      if (this.userType == "client") {
        this.commonService.getId("client").subscribe((user: User) => {
          this.id = user.id + 1;
        });

        this.clientService.register(this.id, this.username, this.password, this.phone, this.email, this.firstname, this.lastname, "client")
        .subscribe((resp) => {
          this.commonService.uploadProfilePicture(this.username, this.imageBlob, "client").subscribe((result) => {
            alert(result['message']);
          })
        })
      }
      else {
        this.commonService.getId("agency").subscribe((user: User) => {
          this.id = user.id + 1;
        });

        this.agencyService.register(this.id, this.username, this.password, this.phone, this.email, this.agencyName, this.address,
          this.uniqueNumber, this.description, "agency").subscribe((resp) => {
            this.commonService.uploadProfilePicture(this.username, this.imageBlob, "agency").subscribe((resp) => {
              alert(resp['message']);
            });
          });
      }

      this.router.navigate(['']);
    }
  }

  imageSelected(event: any): void {
    this.imageService.imageSelected(event, this.imageHandler)
      .then((isValid) => {
        this.imageChoosen = isValid;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  upload(): void {
    this.imageChoosen = false;
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      this.imageBlob = readerEvent.target.result as string;
    };

    reader.readAsDataURL(this.imageHandler.image);
  }
}

  


