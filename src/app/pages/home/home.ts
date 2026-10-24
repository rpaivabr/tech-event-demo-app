import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AttendeeList } from '../../components/attendee-list/attendee-list';
import { AttendeeData } from '../../services/attendee-data';
import { Attendee } from '../../interfaces/attendee';

@Component({
  imports: [MatButtonModule, AttendeeList, RouterLink],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  attendeeData = inject(AttendeeData);
  attendees = this.attendeeData.attendees;
  totalAttendees = computed(() => this.attendees().length);
  isLoading = this.attendeeData.isLoading;
  isErrored = this.attendeeData.isErrored;

  addAttendee(newAttendee: Attendee): void {
    this.attendeeData.add(newAttendee);
  }

  deleteAttendee(cpf: string): void {
    this.attendeeData.remove(cpf);
  }
}
