import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AttendeeData } from '../../services/attendee-data';

@Component({
  imports: [MatToolbarModule],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private attendeeData = inject(AttendeeData);
  total = this.attendeeData.totalAttendees;
}
