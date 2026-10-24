import { Component, inject, signal } from '@angular/core';
import { AttendeeData } from '../../services/attendee-data';
import { Attendee } from '../../interfaces/attendee';
import { JsonPipe } from '@angular/common';
import { email, form, FormField, required, FormRoot } from '@angular/forms/signals';

@Component({
  imports: [JsonPipe, FormField, FormRoot],
  selector: 'app-attendee-form',
  styleUrl: './attendee-form.scss',
  templateUrl: './attendee-form.html',
})
export class AttendeeForm {
  attendeeData = inject(AttendeeData);
  attendee = signal<Attendee>({
    name: '',
    cpf: '',
    email: '',
  });
  attendeeForm = form(
    this.attendee, 
    (schemaPath) => {
      required(schemaPath.name, {message: 'Nome é obrigatório'});
      required(schemaPath.email, {message: 'Email é obrigatório'});
      email(schemaPath.email, {message: 'Email inválido.'});
    },
    {
      submission: {
        action: async (field) => {
          console.log('Submitting form with value:', field().value());
          const result = await this.attendeeData.add(field().value());
          return {kind: 'serverError', message: 'Failed to submit form'};
        },
      },
    }
  );
}
