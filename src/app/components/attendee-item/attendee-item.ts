import { Component, input, output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Attendee } from '../../interfaces/attendee';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatListModule, MatButtonModule, MatIconModule, RouterLink],
  selector: 'app-attendee-item',
  styleUrl: './attendee-item.scss',
  templateUrl: './attendee-item.html',
})
export class AttendeeItem {
  attendee = input.required<Attendee>();
  deleteItem = output<void>();
}
