import { Component } from '@angular/core';
import { MainNavigationComponent } from "./main-navigation/main-navigation.component";
import { ROUTER_DIRECTIVES } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ MainNavigationComponent, ROUTER_DIRECTIVES]
})
export class AppComponent {
  title = 'Typeclass Decorator';
}
