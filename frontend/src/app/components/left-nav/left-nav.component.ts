import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ChatVisibilityService } from '../../services/chat-visibility.service';

@Component({
  selector: 'app-left-nav',
  standalone: true,
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css'],
  imports: [CommonModule]
})
export class LeftNavComponent {
  @Input() users: { name: string }[] = [];
  @Input() username: string = '';
  @Input() isChatVisible: boolean = false;
  @Output() startConversation = new EventEmitter<string>();

  selectedUser: string | null = null; // Track the selected user

  constructor(private chatVisibilityService: ChatVisibilityService) {}
  handleSelectUser(userName: string): void {
    this.selectedUser = userName; // Update the selected user
    this.isChatVisible = true; // This line makes the chat interface visible

  }

  handleStartConversation(userName: string): void {
    this.startConversation.emit(userName);
  }
}
