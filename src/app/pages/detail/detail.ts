import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AttendeeData } from '../../services/attendee-data';
import { AttendeeForm } from '../../components/attendee-form/attendee-form';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [RouterLink, AttendeeForm, JsonPipe],
  selector: 'app-detail',
  styleUrl: './detail.scss',
  templateUrl: './detail.html',
})
export class Detail {
  private attendeeData = inject(AttendeeData);
  id = input<string>();
  existingUser = computed(() => this.attendeeData.getByCpf(this.id()));
  attendee = computed(() => this.attendeeData.getByCpf(this.id()));
  isNew = computed(() => this.id() === 'new');
}
