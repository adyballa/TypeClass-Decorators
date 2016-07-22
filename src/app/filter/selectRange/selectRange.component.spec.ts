/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { SelectRangeComponent } from './selectRange.component';

describe('Component: Select', () => {
  it('should create an instance', () => {
    let component = new SelectRangeComponent();
    expect(component).toBeTruthy();
  });
});
