import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  genre = ''
  q = ''
  animeResults: any[] = []

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // search/:genre/:q
    this.genre = this.activatedRoute.snapshot.params['genre']
    this.q = this.activatedRoute.snapshot.params['q']
  
    // console.log('genre ---> ', this.genre)
    // console.log('q ---> ', this.q)

    // https://api.jikan.moe/v3/search/anime?q=naruto
    const url = `https://api.jikan.moe/v3/search/${this.genre}`
    // console.log('url ---> ', url)

    let animeParams = (new HttpParams()).set('q', this.q)

    this.http.get<any>(url, { params: animeParams })
      .toPromise()
      .then(animeResults => {
        this.animeResults = animeResults['results']
        console.log('this.animeResults ---> ', this.animeResults)
      }
      )
      .catch((error: HttpErrorResponse) => { console.log('HttpError ---> ', error )})
}}

// One anime result:
// airing: false
// end_date: "2011-07-22T00:00:00+00:00"
// episodes: 2
// image_url: "https://cdn.myanimelist.net/images/anime/10/74217.jpg?s=d1002e34fd5b0d1c0d86ac45a39ee47e"
// mal_id: 30840
// members: 697
// rated: "PG-13"
// score: 5.33
// start_date: "2011-01-22T00:00:00+00:00"
// synopsis: "Specials included on SD Gundam Collection Box."
// title: "Many Things SD Gundam"
// type: "Special"
// url: "https://myanimelist.net/anime/30840/Many_Things_SD_Gundam"