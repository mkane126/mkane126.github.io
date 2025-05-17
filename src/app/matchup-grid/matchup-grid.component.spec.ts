import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchupGridComponent } from './matchup-grid.component';

describe('MatchupGridComponent', () => {
  let component: MatchupGridComponent;
  let fixture: ComponentFixture<MatchupGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchupGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchupGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
