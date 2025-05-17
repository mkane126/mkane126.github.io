import { TestBed } from '@angular/core/testing';

import { MatchupServiceService } from './matchup-service.service';

describe('MatchupServiceService', () => {
  let service: MatchupServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchupServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
