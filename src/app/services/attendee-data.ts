import { computed, resource, Service, Signal } from '@angular/core';
import { Attendee, AttendeeDTO, mapFromDto, mapToDto } from '../interfaces/attendee';

@Service()
export class AttendeeData {
  private attendeesResource = resource({
    loader: async (): Promise<Attendee[]> => {
      const res = await fetch('http://localhost:8084/entidade/v1/');
      const data = await res.json();
      return data.map((item: AttendeeDTO) => mapFromDto(item));
    },
  });
  attendees = computed(() => this.attendeesResource.value() || []);
  totalAttendees = computed(() => this.attendees().length);
  isLoading = computed(() => this.attendeesResource.isLoading());
  isErrored = computed(() => this.attendeesResource.error());

  getAttendees(): Signal<Attendee[]> {
    return computed(() => this.attendeesResource.value() || []);
  }

  getByCpf(cpf?: string): Attendee | undefined {
    if (!cpf) return undefined;
    return this.attendees().find((attendee) => attendee.cpf === cpf);
  }

  add(attendee: Attendee): Promise<void> {
    const newAttendee = mapToDto(attendee);
    console.log('Adding attendee:', newAttendee);
    return fetch('http://localhost:8084/entidade/v1/', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAttendee)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Failed to add attendee');
      }
      this.attendeesResource.reload();
    });
  }

  remove(cpf: string): void {
    // this.attendees.update((attendees) =>
    //   attendees.filter((attendee) => attendee.cpf !== cpf)
    // );
  }

}
