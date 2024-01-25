import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

api.defaults.headers.Authorization = `Bearer ${process.env.TMDB_API_KEY}`
