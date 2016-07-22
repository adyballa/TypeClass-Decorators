/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListModelService } from "../cars/listModel.service";

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { FilterComponent } from './filter.component';

describe('Component: Filter', () => {
  it('should create an instance', () => {
    let component = new FilterComponent(new ListModelService);
    expect(component).toBeTruthy();
  });
});
