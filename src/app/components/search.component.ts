import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  genre = 'anime' // default

  constructor() {

   }

  // create
  ngOnInit(): void {
  }

  // runs when user select either anime or manga button
  setGenre(g: string) {
    this.genre = g;
    console.info('genre chosen ---> ', this.genre)
  }
}
