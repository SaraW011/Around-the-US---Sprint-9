export default class Api {
  constructor(objectString) {
    this._url = objectString.baseUrl;
    this._token = objectString.token;
    this._headers = { 
      authorization: this._token, 
      'Content-type': 'application/json' };
  }
 
  //making a request to the server
  checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res),
      console.log("Error Type:", 
      res.status, res.statusText);
    }
  }
  
  // 1. Loading user information from the server
  async getUserInfo() {
    const res = await fetch(`${this._url}/users/me`, {
      method: "GET", //default
      headers: this._headers,
    });
    return this.checkResponse(res);
  }
  
  // 2. Loading cards from the server
  async getInitialCards() {
    const res = await fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    });
    return this.checkResponse(res);
  }

  // 3. Editing the profile
  async editUserInfo(name, job) {
    const res = await fetch(`${this._url}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        job: job,
      }),
    });
    return this.checkResponse(res);
  }

  // 4. Adding a new card
  async addPlaceCard(place, link) {
    const res = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        place: place,
        link: link,
      }),
    });
    return this.checkResponse(res);
  }

  // 7. Deleting a card
  async deleteCard(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    });
    return this.checkResponse(res);
  }

  // 8a. Adding likes
  async likeCard(cardId) {
    const res = await fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers
    });
    return this.checkResponse(res);
  }

  // 8b. Removing likes
  async dislikeCard(cardId) {
    const res = await fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    });
    return this.checkResponse(res);
  }

  // 9. Updating profile picture
  async editAvatar(avatar) {
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({avatar: avatar}),
    });
    return this.checkResponse(res);
  }
}