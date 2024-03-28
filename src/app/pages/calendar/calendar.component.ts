import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
interface IHour {
  name: string;
  time: string;
}

interface IEvent {
  name: string;
  time: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatButton,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class CalendarComponent {
  selectedDate: Date | null;
  hours: IHour[];
  events: IEvent[];

  constructor() {
    this.selectedDate = new Date();
    this.hours = Array.from(Array(24).keys()).map((index) => ({
      name: index.toString(),
      time: index.toString(),
    }));
    this.events = Array.from(Array(24).keys()).map((index) => ({
      name: index.toString(),
      time: index.toString(),
    }));
  }

  onChangeDate() {
    this.events = Array.from(Array(24).keys()).map((index) => ({
      name: index.toString(),
      time: index.toString(),
    }));
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
}
