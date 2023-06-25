import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) { }

  uri: string = "http://localhost:4000";

  register(username, password, phone, email, agencyName, address, uniqueNumber, description) {
    let data = {
      username: username,
      password: password,
      phone: phone,
      email: email,
      agencyName: agencyName,
      address: address,
      uniqueNumber: uniqueNumber,
      description: description
    };

    return this.http.post(`${this.uri}/user/register`, data);
  }
}
