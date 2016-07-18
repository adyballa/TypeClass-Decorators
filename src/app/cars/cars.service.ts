import { Injectable } from '@angular/core';
import { Car, Colors, Brands } from '../class/car';

@Injectable()
export class CarsService {

  private _cars : Car[] = [];

  constructor() {}

  public createCar(props : any[]) : Car{
    return new Car(props[0],props[1], props[2]);
  }

  get cars() : Car[]{
    if(!this._cars.length){
      for(let i = 0; i < 10; i++){
        this._cars.push(new Car(
            Math.ceil(Math.random()*(i+1)*20),
            Colors[Math.floor(Math.random()*3)],
            Brands[Math.floor(Math.random()*2)]
        ));
      }
    }
    return this._cars;
  }
}
