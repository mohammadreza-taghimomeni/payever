import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ModifyEventDialog } from '../shared/modify-event/modify-event.component';

interface IHour {
  name: string;
  time: string;
  event?: IEvent;
}

export interface IEvent {
  title: string;
  description?: string;
  date: Date;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class CalendarComponent {
  selectedDate: Date;
  hours: IHour[];
  events: IEvent[] = [];

  constructor(public dialog: MatDialog) {
    this.selectedDate = new Date();
    this.hours = Array.from(Array(24).keys()).map((index) => ({
      name: index.toString(),
      time: index.toString(),
    }));

    this.onMakeEmptyEvents();
  }

  onMakeEmptyEvents() {
    const date = this.selectedDate || new Date();

    this.events = Array.from(Array(24).keys()).map((index) => ({
      title: '',
      description: '',
      date: new Date(date.setHours(index, 0, 0)),
    }));
  }

  onChangeDate() {
    this.onMakeEmptyEvents();
  }

  drop(event: CdkDragDrop<IEvent[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onModifyEvent(index: number): void {
    console.log(index);
    let newEvent: IEvent = this.events[index];

    const dialogRef = this.dialog.open(ModifyEventDialog, {
      data: newEvent,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
