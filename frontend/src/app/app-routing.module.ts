import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: '', component: AppComponent } // Adjust this if you have a different landing page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
