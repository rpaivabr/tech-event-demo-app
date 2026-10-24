import { Component, computed, inject } from '@angular/core';
import { AttendeeList } from '../../components/attendee-list/attendee-list';
import { RouterLink } from '@angular/router';
import { AttendeeData } from '../../services/attendee-data';
import { Attendee } from '../../interfaces/attendee';

@Component({
  imports: [AttendeeList, RouterLink],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  attendeeData = inject(AttendeeData);
  attendees = this.attendeeData.getAttendees();
  totalAttendees = computed(() => this.attendees().length);
  isLoading = this.attendeeData.isLoading;
  isErrored = this.attendeeData.isErrored;

  addAttendee(newAttendee: Attendee): void {
    this.attendeeData.add(newAttendee);
  }
}
