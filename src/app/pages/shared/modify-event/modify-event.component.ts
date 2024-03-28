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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modify-event.component.html',
  styleUrl: './modify-event.component.scss',
})
export class ModifyEventDialog {
  eventForm: FormGroup = new FormGroup({});

  requiredFormControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<ModifyEventDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IEvent,
    fb: FormBuilder
  ) {
    console.log('data', data);
    this.eventForm = fb.group({
      title: this.requiredFormControl,
    });

    this.f['title'].setValue(data.title || '');
  }
  get f() {
    return this.eventForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveEvent() {
    if (this.eventForm.invalid) {
      return;
    }
  }
}
