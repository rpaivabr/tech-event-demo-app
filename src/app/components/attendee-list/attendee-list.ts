import { Component, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { Attendee } from '../../interfaces/attendee';

const initialAttendees: Attendee[] = [
  { cpf: '123.456.789-00', name: 'Rafael', email: 'rafael@example.com' },
  { cpf: '987.654.321-00', name: 'João', email: 'joao@example.com' },
];

@Component({
  imports: [MatListModule, MatButtonModule],
  selector: 'app-attendee-list',
  styleUrl: './attendee-list.scss',
  templateUrl: './attendee-list.html',
})
export class AttendeeList {
  attendees = signal<Attendee[]>(initialAttendees);

  add() {
    const newAttendee: Attendee = {
      cpf: '111.222.333-44',
      name: 'Novo Participante',
      email: 'teste@teste.com',
    };
    this.attendees.update((attendees) => [newAttendee, ...attendees]);
  }
}
