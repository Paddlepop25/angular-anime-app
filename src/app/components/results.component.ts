import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  genre = ''
  q = ''

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // search/:genre/:q
    this.genre = this.activatedRoute.snapshot.params['genre']
    this.q = this.activatedRoute.snapshot.params['q']
  
    console.log('genre ---> ', this.genre)
    console.log('q ---> ', this.q)
  }

}
