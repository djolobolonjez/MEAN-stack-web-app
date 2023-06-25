import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agency } from '../models/agency';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) { }

  uri: string = "http://localhost:4000";

  register(id, username, password, phone, email, agencyName, address, uniqueNumber, description, type) {
    let data = {
      id: id,
      username: username,
      password: password,
      phone: phone,
      email: email,
      agencyName: agencyName,
      address: address,
      uniqueNumber: uniqueNumber,
      description: description,
      type: type
    };

    return this.http.post(`${this.uri}/user/register`, data);
  }

  getAllAgencies() {
    return this.http.get(`${this.uri}/agency/getAllAgencies`)
  }
}
