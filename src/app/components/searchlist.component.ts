import { Component, OnInit } from '@angular/core';
import { AnimeDatabaseService } from '../anime.database.service';
import { SearchOption } from '../models';

@Component({
  selector: 'app-searchlist',
  templateUrl: './searchlist.component.html',
  styleUrls: ['./searchlist.component.css']
})
export class SearchlistComponent implements OnInit {

  animeSearches: SearchOption[] = [] // set to array like from models.ts

  constructor(private animeDB: AnimeDatabaseService) { }

  ngOnInit(): void {
    this.animeDB.getSearchOptions() // retrieve saved q from IndexedDB
      .then(result => {
        this.animeSearches = result.map(anime => {
          // @ts-ignore
          anime.genre = anime.genre == 0 ? 'anime' : 'manga'
          return anime
        })
      })
    }
  }
