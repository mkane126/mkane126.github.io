import { Component, OnInit } from '@angular/core';
import { MatchupService, Matchup } from '../matchup-service.service';

@Component({
  selector: 'app-matchup-grid',
  templateUrl: './matchup-grid.component.html',
  styleUrls: ['./matchup-grid.component.css']
})
export class MatchupGridComponent implements OnInit {
  matchups: Matchup[] = [];
  teams: string[] = [];
  weeks: number[] = [];

  constructor(private matchupService: MatchupService) { }

  ngOnInit(): void {
    this.matchupService.loadMatchups().subscribe(data => {
      this.matchupService.setMatchups(data);
      this.matchups = this.matchupService.getMatchups();

      this.teams = this.getUniqueTeams(this.matchups);
      this.weeks = [...new Set(this.matchups.map(m => m.week))].sort((a, b) => a - b);
    });
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
    } else {
      // Otherwise, select the clicked team as winner
      matchup.winner = team;
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
