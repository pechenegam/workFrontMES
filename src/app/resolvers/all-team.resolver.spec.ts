import { TestBed } from '@angular/core/testing';

import { AllTeamResolver } from './all-team.resolver';

describe('AllTeamResolver', () => {
  let resolver: AllTeamResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AllTeamResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
