import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IEvent } from '../../calendar/calendar.component';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-modify-event',
  templateUrl: './modify-event.component.html',
  styleUrl: './modify-event.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class ModifyEventDialog {
  eventForm: FormGroup = new FormGroup({});

  requiredFormControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<ModifyEventDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IEvent,
    fb: FormBuilder
  ) {
    this.eventForm = fb.group({
      title: [],
      date: this.requiredFormControl,
      description: [],
    });

    this.f['title'].setValue(data.title || '');
    this.f['date'].setValue(data.date || '');
    this.f['description'].setValue(data.description || '');
  }
  get f() {
    return this.eventForm.controls;
  }

  onNoClick(): void {
    debugger;
    this.dialogRef.close(null);
  }

  onSaveEvent() {
    if (this.eventForm.invalid) {
      return;
    }
    // console.log(this.eventForm.value);
    this.dialogRef.close(this.eventForm.value);
  }
}
