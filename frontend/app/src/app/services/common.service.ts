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

  getId(type: string) {
    return this.http.get(`${this.uri}/user/getId?param=${type}`);
  }

  getLoggedUser(username) {
    return this.http.get(`${this.uri}/user/getLoggedUser?param=${username}`);
  }

  getUserById(id: number, type: string) {
    let data = {
      id: id,
      type: type
    };
    return this.http.post(`${this.uri}/user/getUserById`, data);
  }

  getUserByUsername(username: string, type: string) {
    let data = {
      username: username,
      type: type
    };
    return this.http.post(`${this.uri}/user/getUserByUsername`, data);
  }
  
  uploadProfilePicture(username: string, blob: string, userType: string) {
    let data = {
      blob: blob,
      userType: userType
    };

    return this.http.post(`${this.uri}/user/${username}/upload`, data);
  }

  getImage(username: string) {
    return this.http.get(`${this.uri}/user/images/${username}`);
  }

  changePassword(username, password, type) {
    let data = {
      username: username, 
      password: password, 
      type: type
    };
    return this.http.post(`${this.uri}/user/changePassword`, data);
  }

  isValidPassword(password: string) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z][A-Za-z\d@$!%*#?&]+$/;
    return regex.test(password);
  }
}
