import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  user: string = ''; // Set this dynamically based on your authentication
  recipient: string = '';
  messages: any[] = [];
  newMessage: string = '';
  requests: any[] = [];
  socket!: Socket;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.socket = io('http://localhost:3000');
    this.setupSocket();
    this.loadMessages();
    this.loadRequests();
  }

  loadMessages(): void {
    if (this.user) {
      this.chatService.getMessages(this.user).subscribe(data => {
        this.messages = data;
      });
    }
  }

  sendMessage(): void {
    if (this.user && this.recipient && this.newMessage) {
      this.chatService.sendMessage(this.user, this.recipient, this.newMessage).subscribe(() => {
        this.newMessage = '';
        this.loadMessages();
      });
    }
  }

  startConversation(): void {
    if (this.user && this.recipient) {
      this.chatService.sendRequest(this.user, this.recipient).subscribe(() => {
        this.socket.emit('send-request', { sender: this.user, receiver: this.recipient });
        console.log('Request sent');
      });
    }
  }

  loadRequests(): void {
    if (this.user) {
      this.chatService.getRequests(this.user).subscribe(data => {
        this.requests = data;
      });
    }
  }

  respondToRequest(requestId: string, response: string): void {
    this.chatService.respondToRequest(requestId, response).subscribe(() => {
      this.socket.emit('response', { requestId, response });
      this.loadRequests();
    });
  }

  setupSocket(): void {
    this.socket.on('new-request', (data: any) => {
      this.loadRequests(); // Refresh requests list
    });

    this.socket.on('request-response', (data: any) => {
      // Handle the response, update the UI as needed
      console.log('Request response received:', data);
    });
  }
}
