import { TestBed } from '@angular/core/testing';
import { AttendeeData } from './attendee-data';

describe('Attendee', () => {
  let service: AttendeeData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendeeData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
