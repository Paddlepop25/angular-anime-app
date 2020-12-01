export enum Genre {
  Anime, Manga
}

export interface SearchOption {
  id?: number,
  q: string,
  genre: Genre
}

export interface AnimeResult {
  image_url: string,
  rated: string,
  synopsis: string,
  title: string,
  url: string
}

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