import { computed, effect, inject, Service } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Attendee, AttendeeDTO, mapFromDto, mapToDto } from '../interfaces/attendee';
import { Router } from '@angular/router';

export const newAttendee: Attendee = { name: '', cpf: '', email: '' };

@Service()
export class AttendeeData {
  private http = inject(HttpClient);
  private router = inject(Router);

  // melhor alternativa a promise apresentada na aula
  private attendeesResource = httpResource<Attendee[]>(() => 'http://localhost:8084/entidade/v1/', {
    parse: data => (data as AttendeeDTO[]).map(mapFromDto) as Attendee[],
    defaultValue: [],
  });

  // estados derivados públicos
  isLoading = this.attendeesResource.isLoading;
  isErrored = this.attendeesResource.status;
  attendees = computed(() => this.attendeesResource.value() ?? []);
  totalAttendees = computed(() => this.attendees()?.length || 0);

  log = effect(() => {
    console.log('Attendees list:', this.attendeesResource.value());
  });

  // metodos públicos
  getByCpf(cpf?: string): Attendee | undefined {
    if (!cpf) return undefined;
    return this.attendees().find((attendee) => attendee.cpf === cpf);
  }

  async add(attendee: Attendee): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post<void>('http://localhost:8084/entidade/v1/', mapToDto(attendee)),
      );
      // invalidação, novo GET para renovar a lista (não faremos este)
      // this.attendeesResource.reload();

      // alternativa, atualizar a lista localmente
      const attendees = this.attendees();
      this.attendeesResource.set([...attendees, attendee]);

      // navegar para home usando o serviço do angular Router
      this.router.navigateByUrl('/');
    } catch (error) {
      console.error('Falha ao salvar', error);
    }
  }

  async remove(cpf: string): Promise<void> {
    try {
      await firstValueFrom(this.http.delete<void>(`http://localhost:8084/entidade/v1/${cpf}`));
      // alternativa, atualizar a lista localmente
      const attendees = this.attendees();
      this.attendeesResource.set(attendees.filter((attendee) => attendee.cpf !== cpf));
    } catch (error) {
      console.error('Falha ao excluir', error);
    }
  }
}
