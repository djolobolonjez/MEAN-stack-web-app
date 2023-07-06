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
      id: worker.id,
      firstname: worker.firstname,
      lastname: worker.lastname,
      email: worker.email,
      phone: worker.phone,
      specialization: worker.specialization,
      agency: id
    };
    return this.http.post(`${this.uri}/agency/submitWorker`, data);
  }

  deleteWorker(email: string) {
    return this.http.get(`${this.uri}/agency/deleteWorker?param=${email}`);
  }

  editWorker(editMail: string, worker: Worker) {
    let data = {
      editMail: editMail,
      firstname: worker.firstname,
      lastname: worker.lastname,
      email: worker.email,
      phone: worker.phone,
      specialization: worker.specialization,
      agency: worker.agency
    };
    return this.http.post(`${this.uri}/agency/editWorker`, data);
  }

  getRequestedJobs(id) {
    return this.http.get(`${this.uri}/agency/getRequestedJobs?param=${id}`);
  }

  getActiveJobs(id) {
    return this.http.get(`${this.uri}/agency/getActiveJobs?param=${id}`);
  }

  declineJob(id) {
    return this.http.get(`${this.uri}/agency/declineJob?param=${id}`);
  }

  getJobId() {
    return this.http.get(`${this.uri}/agency/getJobId`);
  }

  sendOffer(req) {
    return this.http.post(`${this.uri}/agency/sendOffer`, req);
  }

  getWorkerId() {
    return this.http.get(`${this.uri}/agency/getWorkerId`);
  }

  getInactiveWorkers(id) {
    return this.http.get(`${this.uri}/agency/getInactiveWorkers?param=${id}`);
  } 

  assignWorker(job, id) {
    let data = {
      job: job,
      id: id
    };
    return this.http.post(`${this.uri}/agency/assignWorker`, data);
  }

  updateJob(job) {
    return this.http.post(`${this.uri}/agency/updateJob`, job);
  }

  finishJob(job) {
    return this.http.get(`${this.uri}/agency/finishJob?param=${job.id}`);
  }
}
