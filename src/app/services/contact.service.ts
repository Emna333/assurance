import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl: string = 'http://localhost:3005/api/contact';

  constructor(private http: HttpClient) {}

  submitContactForm(userData) {
    return this.http.post<{msg:string}>(this.apiUrl,userData);
  }
}