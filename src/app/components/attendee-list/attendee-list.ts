import { Component, effect, inject, input, output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Attendee } from '../../interfaces/attendee';
import { AttendeeItem } from '../attendee-item/attendee-item';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [MatListModule, AttendeeItem],
  selector: 'app-attendee-list',
  styleUrl: './attendee-list.scss',
  templateUrl: './attendee-list.html',
})
export class AttendeeList {
  // confirmar antes de excluir com dialog
  readonly dialog = inject(MatDialog);

  attendees = input.required<Attendee[]>();
  addNew = output<Attendee>();
  deleteItem = output<string>();
  
  async confirmDelete(cpf: string) {
    const dialogRef = this.dialog.open(ConfirmDialog);
    const dialogRes = await firstValueFrom(dialogRef.afterClosed())
    if (dialogRes === undefined) return;
    this.deleteItem.emit(cpf);
  }
}
