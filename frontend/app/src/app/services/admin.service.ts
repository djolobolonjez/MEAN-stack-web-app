import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  uri: string = "http://localhost:4000";

  login(username: string, password: string) {
    let data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.uri}/admin/login`, data);
  }

  getRegistrationRequests() {
    return this.http.get(`${this.uri}/admin/getRegistrationRequests`);
  }

  allowRegistration(username: string) {
    return this.http.get(`${this.uri}/admin/allowRegistration?param=${username}`);
  }

  denyRegistration(username: string) {
    return this.http.get(`${this.uri}/admin/denyRegistration?param=${username}`);
  }

  getVacancyRequests() {
    return this.http.get(`${this.uri}/admin/getVacancyRequests`);
  }

  acceptVacancyRequest(name: string) {
    return this.http.get(`${this.uri}/admin/acceptVacancyRequest?param=${name}`);
  }
  
  deleteVacancyRequest(name: string) {
    return this.http.get(`${this.uri}/admin/deleteVacancyRequest?param=${name}`);
  }

  getAllClients() {
    return this.http.get(`${this.uri}/admin/getAllClients`);
  }

  getAllAgencies() {
    return this.http.get(`${this.uri}/admin/getAllAgencies`);
  }

  getAllJobs() {
    return this.http.get(`${this.uri}/admin/getAllJobs`);
  }
}
