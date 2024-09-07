import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameFormComponent } from './components/name-form/name-form.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { FilterPipe } from './filter.pipe';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { ChatService } from './services/chat.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ChatInterfaceComponent } from './components/chat-interface/chat-interface.component';
import { ChatVisibilityService } from './services/chat-visibility.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule, NameFormComponent, UsersListComponent, FilterPipe, LeftNavComponent, ChatInterfaceComponent],
  providers: [ChatService] // ChatService provider only
})
export class AppComponent {
  title = 'Chat App';
  users: { name: string }[] = [];  // Dynamically storing users
  currentUsername: string | null = null; // Logged in user's name
  isUsersListVisible = false;
  selectedUser: string | null = null;
  isChatVisible: boolean = false; // Boolean to control visibility of chat interface

  constructor(
    private chatService: ChatService,
    private chatVisibilityService: ChatVisibilityService
  ) { } // Inject both ChatService and ChatVisibilityService

  ngOnInit(): void {
    this.loadUsers(); // Load users on component initialization
  }

  loadUsers(): void {
    this.chatService.getUsers().subscribe(
      (response) => {
        console.log('Fetched users:', response); // Log fetched users
        this.users = response; // Update users array
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onSubmitName(name: string): void {
    this.currentUsername = name;
    this.chatService.addUser(name).subscribe(
      (response) => {
        console.log('User added successfully:', response);
        this.loadUsers(); // Refresh the user list
        this.isUsersListVisible = true; // Show the user list
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
  }

  onClose(): void {
    this.isUsersListVisible = false; // Hide the user list
  }

  onSelectUser(user: { name: string }): void {
    console.log('Selected User:', user.name);
  }

  onStartConversation(username: string): void {
    console.log('Starting conversation with', username);
  }

  handleStartConversation(userName: string): void {
    this.selectedUser = userName;
  }

  handleSelectUser(userName: string): void {
    this.selectedUser = userName;
    this.chatVisibilityService.setChatVisibility(true); // Use the service to show the chat
  }

  toggleChat(): void {
    this.isChatVisible = !this.isChatVisible; // Toggle chat visibility
  }
}
