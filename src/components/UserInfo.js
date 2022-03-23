export default class UserInfo {
  constructor(userNameElement, userJobElement, avatar ) {
    this._userNameElement = userNameElement;
    this._userJobElement = userJobElement;
    this._avatar = avatar
  }

  getUserInfo() {
    this._userData = {
      name: this._userNameElement.textContent,
      about: this._userJobElement.textContent,
    };
    return this._userData;
  }

  setUserInfo(name, about) {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = about;
  }

  setUserAvatar(avatar){
    this._avatar.src = avatar;
  }
}