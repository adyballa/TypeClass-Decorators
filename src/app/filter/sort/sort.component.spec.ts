/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListModelService } from "../../cars/listModel.service";

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { SortComponent } from './sort.component';

describe('Component: Sort', () => {
  it('should create an instance', () => {
    let component = new SortComponent(new ListModelService);
    expect(component).toBeTruthy();
  });
});
