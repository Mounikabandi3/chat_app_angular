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
    
    // Make POST request to save the name
    this.http.post('http://localhost:3000/api/users', { name: this.name })
      .pipe(
        catchError(error => {
          console.error('Error saving user:', error);
          return of(null); // Handle the error appropriately
        })
      )
      .subscribe(response => {
        if (response) {
          console.log('User saved successfully:', response);
          this.submitName.emit(this.name); // Emit the name if the API call is successful
          this.name = ''; // Clear the input field after submission
        }
      });
  }

  handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.name = input.value;
  }
}
