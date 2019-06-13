import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { CommonServiceModule } from 'testing/CommonService.module';
import { SharedModule } from '../shared/shared.module';

describe('DatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CommonServiceModule,
      SharedModule
    ]
  }));

  it('should be created', () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    expect(service).toBeTruthy();
  });
});
