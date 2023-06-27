import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  uri: string = "http://localhost:4000";

  login(username, password) {
    let data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.uri}/user/login`, data);
  }

  getId() {
    return this.http.get(`${this.uri}/user/getId`);
  }

  
uploadProfilePicture(username: string, blob: string) {
    let data = {
      blob: blob
    };

    return this.http.post(`${this.uri}/user/${username}/upload`, data);
  }

  getImage(username: string) {
    return this.http.get(`${this.uri}/user/images/${username}`);
  }
}
