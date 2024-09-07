// chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000'; // Match this with your backend

  constructor(private http: HttpClient) { }

  addUser(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, { name });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }
}
