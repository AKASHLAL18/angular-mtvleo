import { Component, Input } from '@angular/core';

@Component({
  selector: 'seat-status',
  template: `
    <div *ngIf="seatsBooked.length > 0">
      <h2>Booked Seats:</h2>
      <p>{{ seatsBooked.join(', ') }}</p>
    </div>
    <div *ngIf="seatsAvailable.length > 0">
      <h2>Available Seats:</h2>
      <p>{{ seatsAvailable.join(', ') }}</p>
    </div>
  `,
  styles: [`h2 { font-family: Lato; }`]
})
export class SeatStatusComponent  {
  @Input() seatsBooked: number[] = [];
  @Input() seatsAvailable: number[] = [];
}
