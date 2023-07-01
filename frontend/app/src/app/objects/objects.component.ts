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

  @ViewChild('canvasRef', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;

  objects: Object[] = [];

  ngOnInit(): void { 
    const queryParams = JSON.parse(localStorage.getItem('queryParams'));
    let username = queryParams.username;

    this.commonService.getUserByUsername(username, "client").subscribe((user: User) => {
      this.clientService.getAllObjects(user.id).subscribe((objects: Object[]) => {
        this.objects = objects;
      });
    })

    
  }
}


