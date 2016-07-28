/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { DateRangeComponent } from './date-range.component';

describe('Component: DateRange', () => {
  it('should create an instance', () => {
    let component = new DateRangeComponent();
    expect(component).toBeTruthy();
  });
});
