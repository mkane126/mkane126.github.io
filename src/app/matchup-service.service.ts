import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { parseISO, differenceInCalendarWeeks } from 'date-fns';

export interface Matchup {
  week: number;
  home: string;
  away: string;
  homeMoneyline?: number;
  awayMoneyline?: number;
  winner?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatchupService {
  private matchups: Matchup[] = [];

  private seasonStart = parseISO('2025-09-05T00:00:00Z');

  constructor(private http: HttpClient) { }

  // Loads from JSON, transforms and returns
  loadMatchups(): Observable<Matchup[]> {
    return this.http.get<any[]>('assets/raw-matchups.json').pipe(
      map(rawList =>
        rawList
          .map(this.transformMatchup.bind(this))
          .filter((m): m is Matchup => !!m)
      )
    );
  }

  // Transforms JSON data into a flat Matchup object
  private transformMatchup(raw: any): Matchup | null {
    const home = raw.home_team;
    const away = raw.away_team;
    const commence = parseISO(raw.commence_time);

    const h2hMarket = raw.bookmakers?.[0]?.markets?.find((m: any) => m.key === 'h2h');
    if (!h2hMarket) return null;

    const homeOutcome = h2hMarket.outcomes.find((o: any) => o.name === home);
    const awayOutcome = h2hMarket.outcomes.find((o: any) => o.name === away);
    if (!homeOutcome || !awayOutcome) return null;

    const gameDay = commence.getUTCDay(); // 0 = Sunday, 1 = Monday, ..., 4 = Thursday
    const nflWeekStart = new Date(this.seasonStart);

    // Ensure week starts Thursday 00:00 UTC
    if (commence < nflWeekStart) return null;
    let week = 1;

    const msInWeek = 7 * 24 * 60 * 60 * 1000;
    const timeDiff = commence.getTime() - nflWeekStart.getTime();
    week = Math.floor(timeDiff / msInWeek) + 1;

    return {
      week,
      home,
      away,
      homeMoneyline: homeOutcome.price,
      awayMoneyline: awayOutcome.price
    };
  }

  // Set matchups after loading (optional: used for local caching)
  setMatchups(data: Matchup[]) {
    this.matchups = data;
  }

  // Get full list of matchups
  getMatchups(): Matchup[] {
    return this.matchups;
  }

  // Update a matchup's winner
  saveMatchup(updated: Matchup) {
    const index = this.matchups.findIndex(
      m => m.week === updated.week && m.home === updated.home && m.away === updated.away
    );

    if (index >= 0) {
      this.matchups[index] = { ...this.matchups[index], ...updated };
    } else {
      this.matchups.push(updated);
    }
  }
}