import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 80 seats: 11 rows of 7 seats and 1 row of 3 seats
  seatRows: number[][] = Array.from({ length: 11 }, (_, i) => Array(7).fill(1)).concat([Array(3).fill(1)]);
  seatsToBook: number = 0;
  bookedSeats: number[] = [];

  // Function to book seats
  bookSeats() {
    let seatsRequired = this.seatsToBook;
    this.bookedSeats = [];

    // Try to book seats in one row first
    for (let rowIndex = 0; rowIndex < this.seatRows.length; rowIndex++) {
      let row = this.seatRows[rowIndex];
      let availableInRow = row.filter(seat => seat === 1).length;

      if (availableInRow >= seatsRequired) {
        // Book seats in this row
        for (let seatIndex = 0; seatIndex < row.length && seatsRequired > 0; seatIndex++) {
          if (row[seatIndex] === 1) {
            row[seatIndex] = 0; // Mark seat as booked
            this.bookedSeats.push(rowIndex * 7 + seatIndex + 1); // Store seat number (1-indexed)
            seatsRequired--;
          }
        }
        break; // Exit the loop once booked
      }
    }

    // If not enough seats in one row, book nearby seats
    if (seatsRequired > 0) {
      for (let row of this.seatRows) {
        for (let seatIndex = 0; seatIndex < row.length && seatsRequired > 0; seatIndex++) {
          if (row[seatIndex] === 1) {
            row[seatIndex] = 0; // Mark seat as booked
            this.bookedSeats.push(row.indexOf(1) + 1); // Store seat number (1-indexed)
            seatsRequired--;
          }
        }
      }
    }
  }

  // Function to return available seats
  getAvailableSeats(): number[] {
    let availableSeats: number[] = [];
    for (let rowIndex = 0; rowIndex < this.seatRows.length; rowIndex++) {
      for (let seatIndex = 0; seatIndex < this.seatRows[rowIndex].length; seatIndex++) {
        if (this.seatRows[rowIndex][seatIndex] === 1) {
          availableSeats.push(rowIndex * 7 + seatIndex + 1);
        }
      }
    }
    return availableSeats;
  }
}
