import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendeeItem } from './attendee-item';

describe('AttendeeItem', () => {
  let component: AttendeeItem;
  let fixture: ComponentFixture<AttendeeItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeItem],
    }).compileComponents();

    fixture = TestBed.createComponent(AttendeeItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
