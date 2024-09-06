import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

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
  @Output() startConversation = new EventEmitter<string>();

  selectedUser: string | null = null; // Track the selected user

  handleSelectUser(userName: string): void {
    this.selectedUser = userName; // Update the selected user
  }

  handleStartConversation(userName: string): void {
    if (this.selectedUser === userName) {
      this.startConversation.emit(userName);
    }
  }
}
