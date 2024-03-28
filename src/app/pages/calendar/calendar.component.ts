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
import { MatDialog } from '@angular/material/dialog';
import { ModifyEventDialog } from '../shared/modify-event/modify-event.component';
interface IHour {
  name: string;
  time: string;
  event?: IEvent;
}

interface IEvent {
  title: string;
  description?: string;
  date: Date;
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
    this.events = Array.from(Array(24).keys()).map((index) => ({
      title: '',
      date: this.selectedDate || new Date(),
      description: '',
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

    const dialogRef = this.dialog.open(ModifyEventDialog, {
      data: { name: 'Mohammad', animal: 'ssss' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
