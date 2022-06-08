/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserserviceService } from './userservice.service';

describe('Service: Userservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserserviceService]
    });
  });

  it('should ...', inject([UserserviceService], (service: UserserviceService) => {
    expect(service).toBeTruthy();
  }));
});
