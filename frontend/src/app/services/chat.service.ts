import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/api'; // Adjust if your backend route prefix is different

  constructor(private http: HttpClient) { }

  addUser(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, { name });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  sendMessage(from: string, to: string, content: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/messages`, { from, to, content });
  }

  getMessages(user: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages/${user}`);
  }

  sendRequest(sender: string, receiver: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/requests`, { sender, receiver });
  }

  respondToRequest(requestId: string, response: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/requests/respond`, { requestId, response });
  }

  getRequests(user: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/requests/${user}`);
  }
}
