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
  hasEvent?: boolean;
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
      // this.events[event.previousIndex].date = new Date(
      //   new Date(this.selectedDate.setHours(event.currentIndex, 0, 0))
      // );

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      for (let i = 0; i < this.events.length; i++) {
        const event = this.events[i];
        event.date = new Date(this.selectedDate.setHours(i, 0, 0));
      }
    }
  }

  onModifyEvent(index: number): void {
    console.log(index);
    let newEvent: IEvent = this.events[index];

    const dialogRef = this.dialog.open(ModifyEventDialog, {
      data: newEvent,
      minWidth: 'min(400px , 100%)',
    });

    dialogRef.afterClosed().subscribe((result: IEvent) => {
      // console.log('index', index);
      // console.log('The dialog was closed', result);
      if (result) {
        if (this.isSameDates(result.date, this.selectedDate)) {
          this.events[index] = {
            ...result,
            date: this.events[index].date,
            hasEvent: true,
          };
        } else {
          this.onMakeEmptyEvents();
          this.selectedDate = new Date(result.date.setHours(index, 0, 0));
          this.events[index] = {
            ...result,
            date: new Date(result.date.setHours(index, 0, 0)),
            hasEvent: true,
          };
        }
      }
    });
  }

  addHours(date: Date, hours: number) {
    const hoursToAdd = hours * 60 * 60 * 1000;
    date.setTime(date.getTime() + hoursToAdd);
    return date;
  }

  isSameDates(firstDate: Date, secondDate: Date): boolean {
    const firstYear = firstDate.getFullYear();
    const firstMonth = firstDate.getMonth();
    const firstDay = firstDate.getDate();
    const secondYear = secondDate.getFullYear();
    const secondMonth = secondDate.getMonth();
    const secondDay = secondDate.getDate();

    switch (true) {
      case firstYear === secondYear &&
        firstMonth === secondMonth &&
        firstDay === secondDay:
        return true;
      case firstYear < secondYear ||
        (firstYear === secondYear && firstMonth < secondMonth) ||
        (firstYear === secondYear &&
          firstMonth === secondMonth &&
          firstDay < secondDay):
        // "firstDate is earlier than secondDate.";
        return false;
      default:
        // "firstDate is later than secondDate.";
        return false;
    }
  }
}
