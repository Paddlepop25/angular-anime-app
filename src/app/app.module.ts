import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { SearchComponent } from './components/search.component';
import { SearchlistComponent } from './components/searchlist.component';
import { ResultsComponent } from './components/results.component';

import { AnimeDatabaseService } from './anime.database.service';

// start lottie animation
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}
//end lottie animation


// routes, omit any / in front
const ROUTES: Routes = [
  { path:'', component: MainComponent },
  { path:'search-list', component: SearchlistComponent },
  { path:'search', component: SearchComponent },
  { path:'search/:genre/:q', component: ResultsComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SearchComponent,
    SearchlistComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [ AnimeDatabaseService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
