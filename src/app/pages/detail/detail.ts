import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AttendeeData } from '../../services/attendee-data';
import { AttendeeForm } from '../../components/attendee-form/attendee-form';
import { Attendee } from '../../interfaces/attendee';

@Component({
  imports: [RouterLink, AttendeeForm],
  selector: 'app-detail',
  styleUrl: './detail.scss',
  templateUrl: './detail.html',
})
export class Detail {
  private attendeeData = inject(AttendeeData);
  id = input<string>();
  isNew = computed(() => !this.id());
  editableAttendee = computed(() => this.attendeeData.getByCpf(this.id()));

  saveData(updatedAttendee: Attendee) {
    this.attendeeData.add(updatedAttendee);
  }
}
