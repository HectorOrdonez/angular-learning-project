import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  nutAmount: number = 100;
  distance: number = 5;
  carryAmount: number = 25;
  fuelConsumption: number = 2;
  totalTransported: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  onCalculate() {
    let n = +this.nutAmount
    let d = +this.distance
    let c = +this.carryAmount
    let f = +this.fuelConsumption

    this.totalTransported = this.calculate(n, d, c, f)
  }

  calculate(n, d, c, f)
  {
    let tripCount = 0
    let totalTransported = 0

    while (n > 0) {
      tripCount++

      this.log()
      this.log(`There are ${n} nuts to carry. Making a trip`)
      let currentLoad = this.calculateCargo(n, c)
      let transportedAmount = this.calculateTransport(currentLoad, d, f)

      n = n - currentLoad
      totalTransported += transportedAmount
      this.log(`In trip #${tripCount}, ${currentLoad} nuts were taken and ${transportedAmount} arrived to destination`)
      this.log(`Nuts left: ${n}`)
      this.log(`Transported ${transportedAmount} to destination, total so far: ${totalTransported}`)
    }

    this.log(`Finished transporting ${totalTransported} nuts in ${tripCount} trips`)

    return totalTransported
  }

  calculateCargo(nutAmount, carryAmount): number {
    this.log(`Calculating next cargo: (N): ${nutAmount}, (C): ${carryAmount}`)
    if (carryAmount >= nutAmount) {
      this.log(`(C) >= (N): Can carry all that is left. Carrying: ${nutAmount}`)
    } else {
      this.log(`(C) < (N): Cannot carry all of them. Will carry at capacity: ${carryAmount}`)
    }

    return carryAmount > nutAmount ? nutAmount : carryAmount
  }

  calculateTransport(currentLoad: number, distance: number, fuelConsumption: number,) {
    this.log(`Calculating next transport: (D)istance: ${distance}, (F)uel consumption: ${fuelConsumption}`)

    const totalConsumption = distance * fuelConsumption
    const transport = currentLoad - totalConsumption

    this.log(`Takes ${totalConsumption} nuts to finish a trip`)

    if (transport < 0) {
      this.log('This trip did not reach destination')
      return 0
    }

    this.log(`Transporting: ${transport} nuts in this trip`)
    return transport
  }

  log(msg = '') {
    console.log(`${msg}.`)
  }
}
