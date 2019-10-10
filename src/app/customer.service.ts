import { Injectable } from '@angular/core';
import { Http } from '@angular/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = "http://localhost:8080/customers";  
  
  constructor(private http : Http) { }  
  
  getData(id: number): Observable<any> {
    this.http.get(`${this.baseUrl}/${id}`).subscribe(data => {
      console.log(data);
    });
    return this.http.get(`${this.baseUrl}/${id}`);
  }  
}
