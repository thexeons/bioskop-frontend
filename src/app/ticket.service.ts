import { Injectable } from '@angular/core';
import { Http } from '@angular/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private baseUrl = "http://localhost:8080/tickets";  
  constructor(private http : Http) { }  
  
  getData(film: String): Observable<any> {
    this.http.get(`${this.baseUrl}/film?film=${film}`).subscribe(data => {
      console.log(data);
    });
    return this.http.get(`${this.baseUrl}/film?film=${film}`);
  }  
}
