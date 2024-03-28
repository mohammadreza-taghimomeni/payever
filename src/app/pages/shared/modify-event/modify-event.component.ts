import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IEvent } from '../../calendar/calendar.component';

@Component({
  selector: 'app-modify-event',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './modify-event.component.html',
  styleUrl: './modify-event.component.scss',
})
export class ModifyEventDialog {
  constructor(
    public dialogRef: MatDialogRef<ModifyEventDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IEvent
  ) {
    console.log('data', data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
