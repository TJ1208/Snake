import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/user`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/${id}`)
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/user/add`, user);
  }
}
