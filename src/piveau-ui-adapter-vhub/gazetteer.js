/* eslint-disable no-console */
/**
 * @author Dennis ritter
 * @created 12.09.2018
 * @description
 */

import axios from 'axios';

export default class Gazetteer {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * @description Get a list of suggestions related to the given keyword.
   * @param query (String)
   * @returns {Promise<any>}
   */
  autocomplete(query) {
    const endpoint = 'autocomplete';
    return new Promise((resolve, reject) => {
      if (!this.baseUrl) {
        reject('disabled')
        return;
      }
      axios.get(`${this.baseUrl}${endpoint}`, {
        params: {
          q: query,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }
}
