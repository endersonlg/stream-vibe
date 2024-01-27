export type ResponseMovie = {
  results: {
    id: number
    title: string
    overview: string
    poster_path: string
    vote_average: number
    vote_count: number
    popularity: number
    release_date: string
  }[]
}

export type ResponseMovieGenre = {
  genres: {
    id: number
    name: string
  }[]
}
