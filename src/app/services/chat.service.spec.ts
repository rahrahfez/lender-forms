import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { CommonServiceModule } from 'testing/CommonService.module';
import { SharedModule } from '../shared/shared.module';

describe('ChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CommonServiceModule,
      SharedModule
    ]
  }));

  it('should be created', () => {
    const service: ChatService = TestBed.get(ChatService);
    expect(service).toBeTruthy();
  });
});
