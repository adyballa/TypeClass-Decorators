"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require("./home/home.component");
var cars_component_1 = require("./cars/cars.component");
var routes = [
    { path: 'cars', component: cars_component_1.CarsComponent },
    { path: '', redirectTo: '/home' },
    { path: 'home', component: home_component_1.HomeComponent },
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
