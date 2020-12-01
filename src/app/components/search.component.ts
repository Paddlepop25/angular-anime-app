import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  genre = 'anime' // default
  animeform: FormGroup

  constructor(private fb: FormBuilder) {}

  // on init, create empty form, set q as formControlName
  ngOnInit(): void {
    this.animeform = this.fb.group({
      q: this.fb.control('', [ Validators.required ])
    })
  }

  // runs when user select either anime or manga button
  setGenre(g: string) {
    this.genre = g;
    // console.info('genre chosen ---> ', this.genre)
  }
}
