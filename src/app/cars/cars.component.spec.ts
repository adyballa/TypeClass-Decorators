/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CarsService } from './cars.service';
import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CarsComponent } from './cars.component';

describe('Component: Cars', () => {
  it('should create an instance', () => {
    let component = new CarsComponent(new CarsService());
    expect(component).toBeTruthy();
  });
});
