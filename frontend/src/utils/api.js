export const api = 'http://localhost:3001'

export const headers = {
  'Authorization': 'letmein'
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories)

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
  .then(res => res.json())
