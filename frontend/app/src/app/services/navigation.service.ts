import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const storedRoute = localStorage.getItem('currentRoute');
    if (storedRoute) {
      this.router.navigate([storedRoute]);
    }
  }

  storeCurrentRoute() {
    const currentRoute = this.router.url;
    console.log(currentRoute);
    localStorage.setItem('currentRoute', currentRoute);
  }
}
