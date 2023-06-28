import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { User } from '../models/user';
import { CommonService } from '../services/common.service';
import { ImageWrapper } from '../models/image';
import { ImageService } from '../services/image.service';
import { AgencyService } from '../services/agency.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private clientService: ClientService, private commonService: CommonService,
              private imageService: ImageService, private agencyService: AgencyService) { }

  username: string;
  firstname: string;
  lastname: string;
  email: string; 
  phone: string;
  profileImage: string;
  type: string;

  imageHandler: ImageWrapper;

  isClient: boolean;
  isEditing: boolean = false;

  agencyName: string;
  description: string;
  address: string;
  
  imageChoosen: boolean = false;

  ngOnInit(): void {
    this.imageHandler = new ImageWrapper();
    this.commonService.getLoggedUser(sessionStorage.getItem('username')).subscribe((user: User) => {
      if (user.type == "client") {
        this.firstname = user.firstname;
        this.lastname = user.lastname;
      }
      else {
        this.agencyName = user.agencyName;
        this.description = user.description;
        this.address = user.address;
      }
      this.type = user.type;
      this.username = sessionStorage.getItem('username');
      
      this.email = user.email;
      this.phone = user.phone;
      this.profileImage = user.profilePicture;
      this.isClient = (user.type == "client" ? true : false);
    })
  }

  editUser() {
    this.isEditing = true;
  }

  applyChanges() {
    this.isEditing = false;
    if (this.type == "client") {
      this.clientService.editUser(this.username, this.firstname, this.lastname, this.email, this.phone, this.profileImage)
        .subscribe((result) => {
          alert(result['message']);
      });
    }
    else {
      this.agencyService.editUser(this.username, this.agencyName, this.address, this.email, this.phone, this.description, this.profileImage)
        .subscribe((result) => {
          alert(result['message']);
        });
    }
  }

  editProfilePicture(event: any) {
    this.imageService.imageSelected(event, this.imageHandler)
      .then((isValid) => {
        this.imageChoosen = isValid;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  uploadProfilePicture(): void {
    this.imageChoosen = false;
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      this.profileImage = readerEvent.target.result as string;
    };

    reader.readAsDataURL(this.imageHandler.image);
  }

}
