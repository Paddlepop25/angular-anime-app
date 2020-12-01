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
      .then(animeResults => console.log(animeResults['results']))
      .catch((error: HttpErrorResponse) => { console.log('HttpError:', error )})

}}