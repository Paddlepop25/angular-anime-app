import { Injectable } from '@angular/core'
import { Dexie } from 'dexie';
import { Genre, SearchOption } from './models';

export const removeSpacesForQ = (q: string) => q.trim().toLowerCase() 

@Injectable()
export class AnimeDatabaseService extends Dexie {
  
  // SearchOption reference to models.ts, number is id type
  private searchOptionTable: Dexie.Table<SearchOption, number> 

  constructor() {
    super('animeApp') // save database name as 'animeApp'

    // create schema
    this.version(1).stores({
      // stores collection (table) name as 'searchOption', keeping it same as in models.ts
      searchOption: '++id, q' // ++auto increment primary key (id) and also index q for faster search
    })

    this.searchOptionTable = this.table('searchOption')
  }

  // save to database (indexedDB)
  // SearchOption reference to schema (models.ts)
  async saveSearchOption(s: SearchOption): Promise<any> {
    const genre = s.genre == Genre.Anime ? 0 : 1
    console.log('saveSearchOption s', s)
    // removes spaces 
    s.q = removeSpacesForQ(s.q)

    // saving to database portion!
    // reference to SQL: select count(*) from searchOption where q = 'abc' and genre = 'anime'
    // check if q and genre in table are same as form values
    const resultCount = await this.searchOptionTable
    .where('q').equals(s.q)
    .and(doc => doc.genre == genre)
    .count()
    
    // if there are no existing records, add to the table
    if (resultCount <= 0) {
      return this.searchOptionTable.add(s)
    }  
  }
}