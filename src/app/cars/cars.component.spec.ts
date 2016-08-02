/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListModelService } from './listModel.service';
import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CarsComponent } from './cars.component';
import {ActivatedRoute} from "@angular/router";
import {TestComponentBuilder} from '@angular/compiler/testing';

class MockActivatedRoute {}

describe('Component: Cars', () => {

  beforeEachProviders(() => [
    {provide: ActivatedRoute, useClass: MockActivatedRoute}
  ]);
  it('should create an instance', () => {
    inject([TestComponentBuilder, ActivatedRoute], (tcb:TestComponentBuilder, ar: MockActivatedRoute) => {
      tcb.createAsync(CarsComponent).then((fixture) => {
        expect(fixture.componentInstance instanceof CarsComponent).toBe(true, 'should create CarsComponent');
        console.log(ar);
      });
    });
  });
});
