import { Component, inject, input, linkedSignal, output } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AttendeeData, newAttendee } from '../../services/attendee-data';
import { Attendee } from '../../interfaces/attendee';

@Component({
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormField],
  selector: 'app-attendee-form',
  styleUrl: './attendee-form.scss',
  templateUrl: './attendee-form.html',
})
export class AttendeeForm {
  attendeeData = inject(AttendeeData);
  initialValue = input<Attendee>();
  save = output<Attendee>();

  // utilizar um existente quando editar, caso contrário iniciar um novo
  // linkedSignal reage a um valor de input, e pode ser editavel pelo formulario
  attendee = linkedSignal<Attendee>(() => this.initialValue() ?? newAttendee);
  attendeeForm = form(this.attendee, (schemaPath) => {
    required(schemaPath.name, { message: 'Nome é obrigatório' });
    required(schemaPath.email, { message: 'Email é obrigatório' });
    email(schemaPath.email, { message: 'Email inválido.' });
  });

  async saveAttendee() {
    await submit(this.attendeeForm, async (field) => {
      this.save.emit(field().value());
    });
  }
}
