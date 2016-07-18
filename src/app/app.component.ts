import { Component } from '@angular/core';
import { CarsComponent} from './cars/cars.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [CarsComponent]
})
export class AppComponent {
  title = 'app works!';
}
