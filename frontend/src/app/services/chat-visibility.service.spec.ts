import { TestBed } from '@angular/core/testing';

import { ChatVisibilityService } from './chat-visibility.service';

describe('ChatVisibilityService', () => {
  let service: ChatVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
