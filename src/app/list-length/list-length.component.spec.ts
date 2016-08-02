/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ListLengthComponent } from './list-length.component';
import {Router} from "@angular/router";
import {TestComponentBuilder} from '@angular/compiler/testing';

class MockRouter {}

describe('Component: ListLength', () => {
  beforeEachProviders(() => [
    {provide: Router, useClass: MockRouter}
  ]);

  it('should create an instance', () => {
    inject([TestComponentBuilder, Router], (tcb:TestComponentBuilder, r:MockRouter) => {
      tcb.createAsync(ListLengthComponent).then((fixture) => {
        expect(fixture.componentInstance instanceof ListLengthComponent).toBe(true, 'should create ListLengthComponent');
      });
    });
  });
});
