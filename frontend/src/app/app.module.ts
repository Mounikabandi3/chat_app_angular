import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule if using template-driven forms
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule if using reactive forms
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NameFormComponent } from './components/name-form/name-form.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ChatInterfaceComponent } from './components/chat-interface/chat-interface.component'; // Import ChatInterfaceComponent
import { MessageComponent } from './components/message/message.component';


@NgModule({
  declarations: [
    AppComponent,
    NameFormComponent,
    UsersListComponent,
    ChatInterfaceComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, // Ensure CommonModule is imported
    FormsModule, // Include FormsModule if using template-driven forms
    ReactiveFormsModule,
    HttpClientModule
     // Include ReactiveFormsModule if using reactive forms
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
