/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { CarsService } from './cars.service';

describe('Cars Service', () => {
  beforeEachProviders(() => [CarsService]);

  it('should ...',
      inject([CarsService], (service: CarsService) => {
    expect(service).toBeTruthy();
  }));
});
