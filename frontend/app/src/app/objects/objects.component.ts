import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Object } from '../models/object';
import { ClientService } from '../services/client.service';
import { CommonService } from '../services/common.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {

  constructor(private clientService: ClientService, private commonService: CommonService, 
              private router: Router) { }

  objects: Object[] = []; 

  selectedObject: Object
  newObject: Object

  userId: number;
  inputData: any;

  addObjectForm: boolean = false;
  fileInput: boolean = false;
  manualInput: boolean = false;
  fileChoosen: boolean = false;

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

  jsonAdd() {
    this.fileInput = true;
    this.manualInput = false;
  }

  manualAdd() {
    this.fileInput = false;
    this.manualInput = true;
  }

  onUpload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const fileContent = reader.result;
        const fileExtension = this.getFileExtension(file.name);
        
        if (fileExtension != 'json') {
          alert('Invalid input file format!');
        }
        else {
          const data = JSON.parse(fileContent as string);
          data[0].owner = this.userId;
          this.inputData = data[0];
          this.fileChoosen = true;
        }
        
      };
  
      reader.readAsText(file);
    }
  }

  getFileExtension(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1].toLowerCase();
  }

  uploadFile() {
    this.clientService.addObject(this.inputData).subscribe((resp) => {
      alert(resp['message']);
      this.commonService.refreshCurrentRoute(this.router);
    })
  }
}


