import { Component, OnInit, Input } from '@angular/core';
import { WebSocketService } from '../../websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true, // Make this component standalone
  imports: [CommonModule, FormsModule] // Import modules needed for this component
})
export class ChatComponent implements OnInit {
  @Input() isChatVisible: boolean = true; // Declare and initialize isChatVisible as an Input property

  message = '';
  messages: string[] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.messages$.subscribe((message) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.webSocketService.sendMessage(this.message);
      this.message = ''; // Clear the input field after sending
    }
  }
}