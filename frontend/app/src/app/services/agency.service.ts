import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agency } from '../models/agency';
import { Worker } from '../models/worker';

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

  searchAgenciesByName(searchName: string) {
    return this.http.get(`${this.uri}/agency/searchByName?param=${searchName}`);
  }

  searchAgenciesByAddress(searchAddress: string) {
    return this.http.get(`${this.uri}/agency/searchByAddress?param=${searchAddress}`);
  }

  advancedSearch(name: string, address: string) {
    let params = new HttpParams().set('name', name).set('address', address);
    return this.http.get(`${this.uri}/agency/advancedSearch`, {params});
  }

  editUser(username, agencyName, address, email, phone, description, image) {
    let data = {
      username: username,
      agencyName: agencyName,
      address: address,
      email: email,
      phone: phone,
      description: description,
      image: image
    };

    return this.http.post(`${this.uri}/agency/editUser`, data);
  }

  getWorkers(id: number) {
    return this.http.get(`${this.uri}/agency/getWorkers?param=${id}`);
  }

  sendVacanciesRequest(id: number, numberOfVacancies: number) {
    let data = {
      id: id,
      numberOfVacancies: numberOfVacancies
    };

    return this.http.post(`${this.uri}/agency/sendVacanciesRequest`, data);
  }

  submitWorker(id: number, worker: Worker) {
    let data = {
      firstname: worker.firstname,
      lastname: worker.lastname,
      email: worker.lastname,
      phone: worker.phone,
      specialization: worker.specialization,
      agency: id
    };
    return this.http.post(`${this.uri}/agency/submitWorker`, data);
  }
}
