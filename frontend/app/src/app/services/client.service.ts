import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  uri: string = "http://localhost:4000";

  register(id, username, password, phone, email, firstname, lastname, type) {
    let data = {
      id: id,
      username: username,
      password: password,
      phone: phone,
      email: email,
      firstname: firstname,
      lastname: lastname,
      type: type
    };

    return this.http.post(`${this.uri}/user/register`, data);
  }

  editUser(username, firstname, lastname, email, phone, image) {
    let data = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      image: image
    };
    return this.http.post(`${this.uri}/client/editUser`, data);
  }

  getAllObjects(id: number) {
    return this.http.get(`${this.uri}/client/getAllObjects?param=${id}`);
  }
}
