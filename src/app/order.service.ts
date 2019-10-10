import { Injectable } from '@angular/core';
import { Http } from '@angular/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = "http://localhost:8080/orders/post";  
  constructor(private http : Http) { }  

  postData(order: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, order);
  }  
}
