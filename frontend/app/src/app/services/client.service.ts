import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  uri: string = "http://localhost:4000";

  register(username, password, phone, email, firstname, lastname) {
    let data = {
      username: username,
      password: password,
      phone: phone,
      email: email,
      firstname: firstname,
      lastname: lastname
    };

    return this.http.post(`${this.uri}/user/register`, data);
  }
}
