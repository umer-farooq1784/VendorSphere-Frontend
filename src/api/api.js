import axios from 'axios'

const client = axios.create({
  baseURL: 'https://backendapi-2uwijg3jda-el.a.run.app/',
  // baseURL: 'http://127.0.0.1:8000/',
})

export default client
