import { Component, OnInit } from '@angular/core';
import { CarsService } from './cars.service';
import { Ord, Eq } from '../decorators/ord.typeclass';

@Component({
  moduleId: module.id,
  selector: 'my-cars',
  templateUrl: 'cars.component.html',
  styleUrls: ['cars.component.css'],
  providers: [ CarsService ]
})
export class CarsComponent implements OnInit{
  public cars;

  constructor(private carsService : CarsService) {
  }

  ngOnInit():any{
    this.getCars();
  }

  private getCars(){
    this.cars = this.carsService.cars;
  }

  public get sorted(){
    return Ord.sort(this.cars);
  }

  public get eq(){
    let props = [null,'red','bmw'];
    return Eq.eq(this.cars, this.carsService.createCar(props));
  }

  public get inRange(){
    let bottom = [10,'yellow',null], top = [100, 'red', null];
    return Ord.inRange(this.cars, this.carsService.createCar(top), this.carsService.createCar(bottom));
  }

  public get less(){
    let top = [50, 'red', 'pontiac'];
    return Ord.less(this.cars, this.carsService.createCar(top));
  }

  public cardinalityChanged(event : Event){
    Ord.swapCardinality(this.cars, (<HTMLInputElement>event.target).value);
  }
}
