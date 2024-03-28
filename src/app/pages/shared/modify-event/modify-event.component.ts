import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IEvent } from '../../calendar/calendar.component';

@Component({
  selector: 'app-modify-event',
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
