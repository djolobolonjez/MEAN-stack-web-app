import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { User } from '../models/user';
import { CommonService } from '../services/common.service';
import { ImageWrapper } from '../models/image';
import { ImageService } from '../services/image.service';
import { AgencyService } from '../services/agency.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private clientService: ClientService, private commonService: CommonService,
              private imageService: ImageService, private agencyService: AgencyService,
              private route: ActivatedRoute, private router: Router,
              private navigationService: NavigationService) {

               this.router.events.subscribe((event) => {
                if (event instanceof NavigationEnd) {
                  this.navigationService.storeCurrentRoute();
                }
              }); 
               }

  username: string;
  firstname: string;
  lastname: string;
  email: string; 
  phone: string;
  profileImage: string;
  type: string;

  userType: string;

  imageHandler: ImageWrapper;

  isClient: boolean;
  isEditing: boolean = false;

  passwordInput: boolean = false;
  oldPassword: string;
  newPasswordFirst: string;
  newPasswordSecond: string;
  passwordMessage: string;

  agencyName: string;
  description: string;
  address: string;
  
  imageChoosen: boolean = false;

  ngOnInit(): void {
    this.imageHandler = new ImageWrapper();
    const urlSegments = this.router.url.split('/');
    this.type = urlSegments[1];
    this.isClient = (this.type == "client" ? true : false);

    if (this.type == "agency") {
      let id: number;
      let username = sessionStorage.getItem('username');
      this.commonService.getUserByUsername(username, "agency").subscribe((user: User) => {
        if (user == null) {
          this.userType = 'adminUser';
        }
        else {
          this.userType = 'agencyUser';
        }
        let isAdmin = (this.userType == 'adminUser' ? true : false);
        if (isAdmin) {
          id = parseInt(localStorage.getItem('agencyId'));
        }
        else {
          id = user.id;
        }
        this.commonService.getUserById(id, this.type).subscribe((user: User) => {
          if (user) {
            this.username = user.username;
            this.agencyName = user.agencyName;
            this.description = user.description;
            this.address = user.address;
            this.email = user.email;
            this.phone = user.phone;
            this.profileImage = user.profilePicture;
          }
        });
        localStorage.setItem('queryParams', JSON.stringify({'username': id.toString(), 'userType': this.userType}));
      });
      
    }
    else {
      let username = sessionStorage.getItem('username');
      this.commonService.getUserByUsername(username, "client").subscribe((user: User) => {

        if (user == null) {
          this.userType = 'adminUser';
        }
        else {
          this.userType = 'clientUser';
        }
        let isAdmin = (this.userType == 'adminUser' ? true : false);
        if (isAdmin) {
          this.username = localStorage.getItem('user');
        }
        else {
          this.username = user.username;
        }
        this.commonService.getUserByUsername(this.username, this.type).subscribe((user: User) => {
          if (user) {
            this.firstname = user.firstname;
            this.lastname = user.lastname;
            this.email = user.email;
            this.phone = user.phone;
            this.profileImage = user.profilePicture;
          }
        });
        localStorage.setItem('queryParams', JSON.stringify({'username': username, 'userType': this.userType}));
      });
    }
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

  showPasswordInput() {
    this.passwordInput = true;
  }

  submitPassword() {
    this.commonService.getUserByUsername(this.username, this.type).subscribe((user: User) => {
      if (this.oldPassword != user.password) {
        this.passwordMessage = "Wrong old password!";
      }
      else {
        if (this.newPasswordFirst != this.newPasswordSecond) {
          this.passwordMessage = "Passwords don't match!";
        }
        else {
          if (!this.commonService.isValidPassword(this.newPasswordFirst)) {
            this.passwordMessage = "Wrong password format!";
          }
          else {
            this.passwordMessage = "";
            this.commonService.changePassword(this.username, this.newPasswordFirst, this.type)
              .subscribe((resp) => {
                alert(resp['message']);
                this.commonService.refreshCurrentRoute(this.router);
              });
          }
        }
      }
    })
  }

}
