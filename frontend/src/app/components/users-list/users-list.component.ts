import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  imports: [CommonModule]
})
export class UsersListComponent {
  @Input() users: { name: string }[] = [];
  @Input() username: string = '';  // Ensure this property is defined
  @Output() close = new EventEmitter<void>();
  @Output() selectUser = new EventEmitter<{ name: string }>();

  handleSelect(user: { name: string }): void {
    this.selectUser.emit(user);
  }

  handleClose(): void {
    this.close.emit();
  }
  startConversation(user: string): void {
    // Implement functionality to start a conversation
    console.log(`Start conversation with ${user}`);
  }
}
