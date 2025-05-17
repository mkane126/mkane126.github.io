import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatchupGridComponent } from './matchup-grid/matchup-grid.component';
import { MatchupService } from './matchup-service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MatchupGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MatchupService],
  bootstrap: [AppComponent]
})
export class AppModule { }