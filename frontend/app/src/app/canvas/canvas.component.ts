import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvasRef', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;
  @Input() width: number;
  @Input() height: number;
  @Input() numberOfRooms: number;
  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const roomWidth = this.width / this.numberOfRooms;
    const roomHeight = this.height;

    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'brown';
    ctx.lineWidth = 2;

    if (this.numberOfRooms === 1) {
      ctx.strokeRect(10, 10, this.width - 50, this.height);
      
      const doorX = (this.width - 50) / 2;
      const doorY = (this.height);
      ctx.fillRect(doorX, doorY - 15, this.width / 12, this.height / 5);
    } else if (this.numberOfRooms === 2) {
      const room1X = 10;
      const room1Y = 10;
      const room1Width = this.width;
      const room2X = room1X + room1Width / 2 + 10;
      const room2Y = roomHeight / 2 + 30;

      const door1X = this.width / 2 + 10;
      const door1Y = roomHeight / 2 + 10;

      const door2X = door1X + 80;
      const door2Y = door1Y + 50;

      ctx.fillRect(door2X, door2Y, this.width / 15, this.height / 5);
      ctx.fillRect(door1X + 20, door1Y - 15, this.width / 15, this.height / 5);
      ctx.strokeRect(room1X + 30, room1Y, room1Width - 30, roomHeight / 2 + 10);
      ctx.strokeRect(room2X, room2Y - 10, room1Width / 2 - 10, roomHeight - 55);
    }else if (this.numberOfRooms === 3) {

      const room1X = 10;
      const room1Y = 10;
      const room1Width = this.width;
      const room2X = room1X + room1Width / 2 + 10;
      const room2Y = roomHeight / 2 + 30;
      const room3X = room1X + room1Width * 2 / 3;
      const room3Y = room1Y;

      const door1X = this.width / 2 + 10;
      const door1Y = roomHeight / 2 + 10;

      const door2X = door1X + 80;
      const door2Y = door1Y + 50;

      const door3X = door1X + 80;
      const door3Y = door1Y - 15;

      ctx.fillRect(door2X - 40, door2Y, this.width / 15, this.height / 5);
      ctx.fillRect(door1X, door1Y - 15, this.width / 15, this.height / 5);
      ctx.fillRect(door3X, door3Y, this.width / 15, this.height / 5);

      ctx.strokeRect(room1X + 30, room1Y, room1Width - 30, roomHeight / 2 + 10);
      ctx.strokeRect(room2X - 40, room2Y - 10, room1Width / 2 + 30, roomHeight - 55);
      ctx.strokeRect(room3X + 10, room3Y, room1Width * 1 / 3 - 10, roomHeight / 2 + 10);
    }
    
  }



}
