export default class Api {  
  constructor(objectString) {  //objectString
    this._url = objectString.baseUrl;
    this._headers = objectString.headers;
  }
 
  //making a request to the server
checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res),
    console.log("Error Type:", 
    res.status, res.statusText);
  }
}
  
  // 1. Loading user information from the server
  async getData() {
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
  async editUserInfo(name, about) {
    const res = await fetch(`${this._url}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    });
    return this.checkResponse(res);
  }

  // 4. Adding a new card
  async addPlaceCard(name, link) {
    const res = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    return this.checkResponse(res);
  }

  // 7. Deleting a card
  async deleteCard(id) {
    const res = await fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    });
    return this.checkResponse(res);
  }

  // 8a. Adding likes
  async likeCard(id) {
    const res = await fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers
    });
    return this.checkResponse(res);
  }

  // 8b. Removing likes
  async dislikeCard(id) {
    const res = await fetch(`${this._url}/cards/likes/${id}`, {
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