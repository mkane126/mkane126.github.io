import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchupGridPageComponent } from './matchup-grid-page.component';

describe('MatchupGridPageComponent', () => {
  let component: MatchupGridPageComponent;
  let fixture: ComponentFixture<MatchupGridPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchupGridPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchupGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
