import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Object } from '../models/object';
import { ClientService } from '../services/client.service';
import { CommonService } from '../services/common.service';
import { User } from '../models/user';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {

  constructor(private clientService: ClientService, private commonService: CommonService) { }

  objects: Object[] = []; 

  selectedObject: Object
  newObject: Object

  userId: number;

  addObjectForm: boolean = false;

  ngOnInit(): void { 
    const queryParams = JSON.parse(localStorage.getItem('queryParams'));
    let username = queryParams.username;

    this.commonService.getUserByUsername(username, "client").subscribe((user: User) => {
      this.userId = user.id;
      this.clientService.getAllObjects(this.userId).subscribe((objects: Object[]) => {
        this.objects = objects;
      });
    });

    this.newObject = new Object();
  }

  showScheme(obj) {
    this.selectedObject = obj;
  }

  addObject() {
    this.addObjectForm = true;
  }

  submitObject() {
    this.addObjectForm = false;
    this.newObject.owner = this.userId;
    this.clientService.addObject(this.newObject).subscribe((resp) => {
      alert(resp['message']);
      this.clientService.getAllObjects(this.userId).subscribe((objects: Object[]) => {
        this.objects = objects;
      });
    })
  }
}


