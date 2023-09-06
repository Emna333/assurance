import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL: string = 'http://localhost:3005/api/users';

  constructor(private httpClient: HttpClient) { }
  signup(userObj: {
   nom: string;
    email: string;
    pwd: string;
    role: string;
    phone: string;
    phone1: string;
    phone2: string;
 
  }, file: File) {
    let fData = new FormData();
    fData.append('file', file);
    fData.append('nom', userObj.nom);
    fData.append('email', userObj.email);
    fData.append('pwd', userObj.pwd);
    fData.append('role', userObj.role);
    fData.append('phone', userObj.phone);
    fData.append('phone1', userObj.phone1);
    fData.append('phone2', userObj.phone2);
   
    return this.httpClient.post<{ msg: string }>(this.userURL + '/signup', fData);
  }
  login(userObj) {
    return this.httpClient.post<{ msg: string, connectedUser: any }>(this.userURL + '/login', userObj);
  }
}
