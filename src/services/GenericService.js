import axios from 'axios'

// axios.defaults.baseURL = "https://unstationary1.herokuapp.com/api";
axios.defaults.baseURL = 'https://dummyjson.com'

class GenericService {
  get = (url) =>
    new Promise((resolve, reject) => {
      axios
        .get(url, {
          headers: {
            Authorization: localStorage.getItem('access_token'),
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })

  post = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, data, {
          headers: {
            Authorization: localStorage.getItem('access_token'),
          },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })

  put = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })

  delete = (url) =>
    new Promise((resolve, reject) => {
      axios
        .delete(url)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
}

export default GenericService
