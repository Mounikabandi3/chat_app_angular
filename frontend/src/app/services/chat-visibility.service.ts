import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatVisibilityService {
  private chatVisibilitySubject = new BehaviorSubject<boolean>(false);
  chatVisibility$ = this.chatVisibilitySubject.asObservable();

  setChatVisibility(isVisible: boolean): void {
    this.chatVisibilitySubject.next(isVisible);
  }
}
