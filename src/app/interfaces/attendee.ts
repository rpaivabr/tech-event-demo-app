export interface Attendee {
  cpf: string;
  name: string;
  email: string;
}

export interface AttendeeDTO {
  idPessoa: number;
  nome: string;
  contato: {
    idContato: number;
    email: string;
  };
  cpf: string;
  dataNascimento: string;
}

export interface CreateAttendeeDTO {
  nome: string;
  email: string;
  cpf: string;
}

export function mapFromDto(dto: AttendeeDTO): Attendee {
  return {
    name: dto.nome,
    cpf: dto.cpf,
    email: dto.contato.email,
  };
}

export function mapToDto(attendee: Attendee): CreateAttendeeDTO {
  return {
    nome: attendee.name,
    cpf: attendee.cpf,
    email: attendee.email,
  };
}