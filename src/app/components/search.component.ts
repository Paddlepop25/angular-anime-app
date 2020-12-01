import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimeDatabaseService, removeSpacesForQ } from '../anime.database.service';
import { Genre, SearchOption } from '../models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  genre = 'anime' // default
  animeform: FormGroup

  constructor(private fb: FormBuilder, private animeDB: AnimeDatabaseService, private router: Router) {}

  // on init, create empty form, set q as formControlName
  ngOnInit(): void {
    this.animeform = this.fb.group({
      q: this.fb.control('', [ Validators.required ])
    })
  }

  goToResultsPage() {
    // search/:genre/:q
    // console.log(this.animeform)
    const q = removeSpacesForQ(this.animeform.get('q').value)
    console.log(q)
    // this.router.navigate(['/search', 'this.genre', q])
  }


  async saveOptions() {
    // SearchOption reference to models.ts, save according to the properties (q, genre). id is optional
    console.log("saving q and genre to database...")
    const option: SearchOption = {
      q: this.animeform.get('q').value,
      genre: this.genre == 'anime' ? Genre.Anime : Genre.Manga
    }
    // parameters in saveSearchOption(xx) must match what was set in anime.database.service.ts hence option above
    await this.animeDB.saveSearchOption(option)

    this.goToResultsPage()

  }

  // runs when user select either anime or manga button
  setGenre(g: string) {
    this.genre = g;
    // console.info('genre chosen ---> ', this.genre)
  }
}
