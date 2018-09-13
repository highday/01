import axios     from "axios";
import {gateway} from "../../../config";

export default class API {

  static setJwtToke(jwtToken) {
    API.jwtToken = jwtToken
  }

  static me() {
    return this._request('get', '/auth/me')
  }

  static getUsers() {
    return this._request('get', '/users')
  }

  static getArticles(queries) {
    return this._request('get', '/articles', queries)
  }

  static async getArticle(id) {
    return this._request('get', `/articles/${id}`)
  }

  static saveArticle(article) {
    if (article.id === null) {
      return this._request('post', `/articles`, article)
    } else {
      return this._request('put', `/articles/${article.title}`, article)
    }
  }

  static deleteArticle(id) {
    return this._request('delete', `/articles/${id}`)
  }

  static async _request(method, path, params = {}) {

    return new Promise((resolve, reject) => {

      const uri = `${gateway.InvokeUrl}${gateway.Stage}${path}`

      let headers, parameters = {}
      if (method === 'get' || method === 'delete') {
        parameters.params = params
        parameters.headers = {Authorization: `Bearer ${API.jwtToken}`}
      } else {
        headers = {headers: {Authorization: `Bearer ${API.jwtToken}`}}
        parameters = params
      }

      axios[method](uri, parameters, headers)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  }
}