import { Component, input, output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Attendee } from '../../interfaces/attendee';
import { AttendeeItem } from '../attendee-item/attendee-item';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatListModule, MatButtonModule, AttendeeItem, RouterLink],
  selector: 'app-attendee-list',
  styleUrl: './attendee-list.scss',
  templateUrl: './attendee-list.html',
})
export class AttendeeList {
  attendees = input.required<Attendee[]>();
  addNew = output<Attendee>();

  // add() {
  //   const newAttendee: Attendee = {
  //     cpf: '12345678900',
  //     name: 'Rafael',
  //     email: 'rafael@example.com',
  //   };
  //   this.addNew.emit(newAttendee);
  // }

  deleteItem(index: number) {}
}
