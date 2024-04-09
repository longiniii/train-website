import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrainServiceService {
  constructor(private trainHttp: HttpClient) {}

  getStation = () => {
    return this.trainHttp.get('https://railway.stepprojects.ge/api/stations')
  }
  getTrains = () => {
    return this.trainHttp.get('https://railway.stepprojects.ge/api/trains')
  }
  getTrain = (id:number) => {
    return this.trainHttp.get(`https://railway.stepprojects.ge/api/trains/${id}`)
  }
  getVagons = () => {
    // backend problem
  }
  getVagon = (id:any) => {
    return this.trainHttp.get(`https://railway.stepprojects.ge/api/getvagon/${id}`)
  }
  getDepartures = () => {
    return this.trainHttp.get('https://railway.stepprojects.ge/api/departures')
  }
  getDeparture = (from:string,to:string,date:string) => {
    return this.trainHttp.get(`https://railway.stepprojects.ge/api/getdeparture?from=${from}&to=${to}&date=${date}`)
  }
  getTickets = () => {
    return this.trainHttp.get('https://railway.stepprojects.ge/api/tickets')
  }
  postTicketRegister = () => {
    // future
  }
  getTicketStatus = (id:string) => {
    return this.trainHttp.get(`https://railway.stepprojects.ge/api/tickets/checkstatus/${id}`)
  }
  getConfirmTicket = (id:string) => {
    return this.trainHttp.get(`https://railway.stepprojects.ge/api/tickets/confirm/${id}`)
  }
  deleteTicket = (id:string) => {
    return this.trainHttp.delete(`https://railway.stepprojects.ge/api/tickets/cancel/${id}`, {responseType: 'text'})
  }
  getSeat = (id:string) => {
    return this.trainHttp.get(`https://railway.stepprojects.ge/api/seat/${id}`)
  }
  deleteAllTickets = () => {
    return this.trainHttp.delete('https://railway.stepprojects.ge/api/tickets/cancelAll')
  }
}
