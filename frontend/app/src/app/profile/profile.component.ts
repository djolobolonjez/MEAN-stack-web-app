import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { User } from '../models/user';
import { CommonService } from '../services/common.service';
import { ImageWrapper } from '../models/image';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private clientService: ClientService, private commonService: CommonService,
              private imageService: ImageService) { }

  username: string;
  firstname: string;
  lastname: string;
  email: string; 
  phone: string;
  profileImage: string;

  imageHandler: ImageWrapper;

  isEditing: boolean = false;
  imageChoosen: boolean = false;

  ngOnInit(): void {
    this.imageHandler = new ImageWrapper();
    this.clientService.getLoggedUser(sessionStorage.getItem('username')).subscribe((user: User) => {
      this.username = sessionStorage.getItem('username');
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.email = user.email;
      this.phone = user.phone;
      this.profileImage = user.profilePicture;
    })
  }

  editUser() {
    this.isEditing = true;
  }

  applyChanges() {
    this.isEditing = false;
    this.clientService.editUser(this.username, this.firstname, this.lastname, this.email, this.phone, this.profileImage)
      .subscribe((result) => {
        alert(result['message']);
        this.clientService.getLoggedUser(this.username).subscribe((user: User) => {
          this.profileImage = user.profilePicture;
        });
    });
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
