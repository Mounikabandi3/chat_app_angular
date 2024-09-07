import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-name-form',
  standalone: true,
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.css'],
  imports: [FormsModule, CommonModule]
})
export class NameFormComponent {
  name: string = '';
  @Output() submitName = new EventEmitter<string>();

  constructor(private http: HttpClient) {} // Inject HttpClient

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (this.name.trim()) { // Check for non-empty name
      this.submitName.emit(this.name); // Emit the name as a string
      this.name = ''; // Clear the input field after submission
    }
  }

  handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.name = input.value;
  }
}
