import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AnimeResult } from '../models';
import { NgNavigatorShareService } from 'ng-navigator-share';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  genre = ''
  q = ''
  animeResults: any[] = []
  canShare = false

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private webShare: NgNavigatorShareService) { }

  ngOnInit(): void {
    // @ts-check
    this.canShare = !!navigator['share']

    // search/:genre/:q
    this.genre = this.activatedRoute.snapshot.params['genre']
    this.q = this.activatedRoute.snapshot.params['q']
  
    // console.log('genre ---> ', this.genre)
    // console.log('q ---> ', this.q)

    // https://api.jikan.moe/v3/search/anime?q=naruto
    const url = `https://api.jikan.moe/v3/search/${this.genre}`
    // console.log('url ---> ', url)

    let animeParams = (new HttpParams()).set('q', this.q)

    // 1) simple way, need to {{ whatever fields from animeResults you want }} in html
    // this.http.get<any>(url, { params: animeParams })
    //   .toPromise()
    //   .then(animeResults => {
    //     this.animeResults = animeResults['results']
    //     console.log('this.animeResults ---> ', this.animeResults)
    //   }
    //   )
    //   .catch((error: HttpErrorResponse) => { console.log('HttpError ---> ', error )})
    
    // 2) reference to model way
    this.http.get<any>(url, { params: animeParams })
    .toPromise()
    .then(response => {
      // console.log('response ---> ', response['results'])
      const results = response['results'] as any[] // type as array as this.animeResults is array
      
      // return just the properties you want, according to animeResult in models.ts
      this.animeResults = results.map(anime => {
        return {
          image_url: anime['image_url'],
          rated: anime['rated'],
          synopsis: anime['synopsis'],
          title: anime['title'],
          url: anime['url']
        } as AnimeResult
        })
      console.log(this.animeResults)
      })
      .catch((error: HttpErrorResponse) => { console.log('HttpError ---> ', error )})
    }
  
    // see documentation: takes only title, text, url (?)
    // remove *ngIf="canShare" from results.html to see console.log (button will disappear if cannot share)
    shareThis(i: number) {
      // console.log('index of each anime result ---> ', i)
      const singleAnime = this.animeResults[i]
      console.log('singleAnime ---> ', singleAnime)

      if (!this.webShare.canShare()) {
        alert(`This service/api is not supported in your Browser`);
        return;
      }

      // only can share text for iphone. check Chuk's article for added code for iphone
      this.webShare.share({
        title: singleAnime.title,
        text: singleAnime.synopsis,
        url: singleAnime.image_url
      })
      .catch( (error) => {
        console.log('Webshare error ---> ', error);
      });
    }
  }
    

// image_url: "https://cdn.myanimelist.net/images/anime/12/84704.jpg?s=da0fc3851d315800dc3aeaf2ddf0d819"
// rated: "PG"
// synopsis: "Valt Aoi, who participated in the Japanese Championship, was scouted for the prestigious Spanish team BC Sol and heads out to Spain. With their sights set on the world, Valt and his friends begin thei..."
// title: "Beyblade Burst God"
// url: "https://myanimelist.net/anime/34901/Beyblade_Burst_God"

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