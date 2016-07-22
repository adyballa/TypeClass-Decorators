import { provideRouter, RouterConfig } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CarsComponent} from "./cars/cars.component";

const routes: RouterConfig = [
    { path: 'cars', component: CarsComponent },
    { path: '', redirectTo: '/home' },
    { path: 'home', component: HomeComponent },
];

export const appRouterProviders = [
    provideRouter(routes)
];