// src/app/services/chat.services.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/users'; // URL to web API

  constructor(private http: HttpClient) { }
  getUsers(): Observable<{ name: string }[]> {
    return this.http.get<{ name: string }[]>(this.apiUrl);
  }
  addUser(name: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name });
  }

  // Other methods related to chat functionality can be added here
}
