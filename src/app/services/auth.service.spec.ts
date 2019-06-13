import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { CommonServiceModule } from 'testing/CommonService.module';
import { SharedModule } from '../shared/shared.module';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CommonServiceModule,
      SharedModule
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
