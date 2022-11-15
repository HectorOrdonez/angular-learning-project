import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  nutAmount: number = 12;
  distance: number = 10;
  carryAmount: number = 4;
  fuel_consumption: number = 10;

  constructor() { }

  ngOnInit(): void {
  }

  onCalculate() {
    let n = +this.nutAmount
    let d = +this.distance
    let c = +this.carryAmount
    let f = +this.fuel_consumption

    console.log('Calculating...')
    console.log('Only using nut amount and carry amount to calculate number of trips...')
    console.log('(N): ' + this.nutAmount)
    // console.log('(D): ' + this.distance)
    console.log('(C): ' + this.carryAmount)
    // console.log('(F): ' + this.fuel_consumption)

    let tripCount = 1
    while(n > 0)
    {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log('There are ' + n + ' nuts to carry. Making a trip')
      tripCount++
      let currentLoad = this.calculateCargo(n, c)

      n = n - currentLoad
      console.log('Taking load out of nut mountain, nuts left:' + n)
    }

    console.log('Finished in ' + tripCount + ' trips.')
  }

  calculateCargo(nutAmount, carryAmount): number {
    console.log('Calculating next cargo: (N): ' + nutAmount + ', (C): ' + carryAmount)
    if (carryAmount >= nutAmount) {
      console.log('(C) >= (N): Can carry all that is left. Carrying: ' + nutAmount)
    } else {
      console.log('(C) < (N): Cannot carry all of them. Will carry at capacity:' + carryAmount)
    }

    return carryAmount > nutAmount ? nutAmount : carryAmount
  }
}
