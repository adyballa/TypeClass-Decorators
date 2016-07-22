/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { MainNavigationComponent } from './main-navigation.component';

describe('Component: MainNavigation', () => {
  it('should create an instance', () => {
    let component = new MainNavigationComponent();
    expect(component).toBeTruthy();
  });
});
