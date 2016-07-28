/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { TextComponent } from './text.component';

describe('Component: Text', () => {
  it('should create an instance', () => {
    let component = new TextComponent();
    expect(component).toBeTruthy();
  });
});
