import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchupGridPageComponent } from './matchup-grid-page/matchup-grid-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'matchup', component: MatchupGridPageComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }