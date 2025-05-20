import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatchupGridComponent } from './matchup-grid/matchup-grid.component';
import { MatchupService } from './matchup-service.service';
import { HttpClientModule } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
// 1️⃣ Core compat module, initialized with your config
import { AngularFireModule } from '@angular/fire/compat';

// 2️⃣ The Firestore module (for AngularFirestore)
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// 3️⃣ The Auth module (if you’re using AngularFireAuth)
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [
    AppComponent,
    MatchupGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [MatchupService],
  bootstrap: [AppComponent]
})
export class AppModule { }