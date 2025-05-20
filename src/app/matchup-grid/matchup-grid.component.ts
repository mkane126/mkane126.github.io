import { Component, OnInit } from '@angular/core';
import { MatchupService, Matchup } from '../matchup-service.service';
import { DataServiceService, MatchupSelection } from '../data-service.service';
import { AuthServiceService } from '../auth-service.service';
import { switchMap, filter } from 'rxjs/operators';
import { combineLatest, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-matchup-grid',
  templateUrl: './matchup-grid.component.html',
  styleUrls: ['./matchup-grid.component.css']
})
export class MatchupGridComponent implements OnInit {
  matchups: Matchup[] = [];
  teams: string[] = [];
  weeks: number[] = [];

  constructor(private matchupService: MatchupService, private data: DataServiceService, private auth: AuthServiceService) { }

  ngOnInit(): void {

    this.auth.user$.subscribe(user => {
      if (!user) {
        // still loading or not logged in yet—just bail out
        return;
      }

      // from here on, `user` is definitely non-null
      this.matchupService.loadMatchups().subscribe(matchups => {
        this.matchups = matchups;
        this.matchupService.setMatchups(matchups);
        this.teams = this.getUniqueTeams(this.matchups);
        this.weeks = [...new Set(this.matchups.map(m => m.week))].sort((a, b) => a - b);
      });
      this.data.loadSelections().subscribe(selections => {
        selections.forEach((selection: MatchupSelection) => {
          this.matchups = this.matchups.map(m =>
            m.home == selection.homeTeam && m.away == selection.awayTeam
              ? { ...m, ...selection }  // merged 
              : m                      // unchanged
          );
        })
      });
    });
  }

  add(homeTeam: string, awayTeam: string, winner: string) {
    this.data.addItem({ username: this.auth.userSubject.getValue()?.email, homeTeam: homeTeam, awayTeam: awayTeam, winner: winner })
      .then(docRef => console.log('Added with ID:', docRef.id));
  }

  getUniqueTeams(matchups: Matchup[]): string[] {
    const teamSet = new Set<string>();
    matchups.forEach(m => {
      teamSet.add(m.home);
      teamSet.add(m.away);
    });
    return Array.from(teamSet).sort();
  }

  getMatchup(week: number, team: string): Matchup | undefined {
    return this.matchups.find(m => m.week === week && (m.home === team || m.away === team));
  }

  clickCell(matchup: Matchup, team: string) {
    if (matchup.winner === team) {
      // If clicked the same winner again, unselect
      matchup.winner = undefined;
      this.data.addOrUpdateItem(this.auth.userSubject.getValue()?.email + matchup.home + matchup.away, { username: this.auth.userSubject.getValue()?.email, homeTeam: matchup.home, awayTeam: matchup.away, winner: '' })
    } else {
      // Otherwise, select the clicked team as winner
      matchup.winner = team;
      this.data.addOrUpdateItem(this.auth.userSubject.getValue()?.email + matchup.home + matchup.away, { username: this.auth.userSubject.getValue()?.email, homeTeam: matchup.home, awayTeam: matchup.away, winner: team })
    }
    this.matchupService.saveMatchup(matchup);
  }

  isWinner(matchup: Matchup, team: string): boolean {
    return matchup.winner === team;
  }

  isLoser(matchup: Matchup, team: string): boolean {
    return (
      !!matchup.winner &&
      matchup.winner !== team &&
      (matchup.home === team || matchup.away === team)
    );
  }

  getTeamWins(team: string): number {
    return this.matchups.filter(m => m.winner === team).length;
  }

  getTeamLosses(team: string): number {
    return this.matchups.filter(
      m => (m.home === team || m.away === team) && m.winner && m.winner !== team
    ).length;
  }

  stripCity(name: string): string {
    const parts = name.split(' ');
    if (parts.length === 1) return name;

    // Handles multi-word team names like "San Francisco 49ers"
    return parts.slice(-1).join(' ');
  }

  formatVegasOdds(price: number | null | undefined): string {
    if (price == null) return '';
    return price >= 0 ? `+${price}` : `${price}`;
  }
}
