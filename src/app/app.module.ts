import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatchupGridComponent } from './matchup-grid/matchup-grid.component';
import { MatchupService } from './matchup-service.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment'
// 1️⃣ Core compat module, initialized with your config
import { AngularFireModule } from '@angular/fire/compat';

// 2️⃣ The Firestore module (for AngularFirestore)
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// 3️⃣ The Auth module (if you’re using AngularFireAuth)
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MatchupGridPageComponent } from './matchup-grid-page/matchup-grid-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './AppRoutingModule';

@NgModule({
  declarations: [
    AppComponent,
    MatchupGridComponent,
    NavbarComponent,
    MatchupGridPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [MatchupService],
  bootstrap: [AppComponent]
})
export class AppModule { }