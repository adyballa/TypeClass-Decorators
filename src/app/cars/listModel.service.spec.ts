/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ListModelService } from './listModel.service';

describe('Cars Service', () => {
  beforeEachProviders(() => [ListModelService]);

  it('should ...',
      inject([ListModelService], (service: ListModelService) => {
    expect(service).toBeTruthy();
  }));
});
