import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { CommonServiceModule } from 'testing/CommonService.module';
import { SharedModule } from '../shared/shared.module';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CommonServiceModule,
      SharedModule
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
