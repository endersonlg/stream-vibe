import { GenreResponse } from '@/app/types'

export type Crew = {
  id: number
  name: string
  image: string | null
  job: string
}

export type MovieDetailResponse = {
  id: number
  poster_path: string | null
  title: string
  overview: string
  release_date: string
  vote_average: number
  vote_count: number
  credits: {
    cast: {
      id: number
      name: string
      profile_path: string | null
    }[]
    crew: {
      id: number
      name: string
      profile_path: string | null
      known_for_department: string
    }[]
  }
  genres: GenreResponse[]
  reviews: {
    results: {
      id: string
      author_details: {
        name: string
        avatar_path: string | null
        rating: number
      }
      content: string
      updated_at: string
      created_at
    }[]
  }
  translations: {
    translations: {
      name: string
    }[]
  }
}
