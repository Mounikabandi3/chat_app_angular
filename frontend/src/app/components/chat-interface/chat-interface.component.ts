import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

@Component({
  selector: 'app-chat-interface',
  standalone: true,
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.css'],
  imports: [CommonModule]
})
export class ChatInterfaceComponent {
  @Input() selectedUser: string | null = null;

  // Implement logic to handle chat functionality here
}
