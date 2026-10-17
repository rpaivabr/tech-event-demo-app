import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendeeList } from './attendee-list';

describe('AttendeeList', () => {
  let component: AttendeeList;
  let fixture: ComponentFixture<AttendeeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeList],
    }).compileComponents();

    fixture = TestBed.createComponent(AttendeeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
