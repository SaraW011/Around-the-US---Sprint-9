export default class UserInfo {
  constructor(userNameElement, userJobElement, avatar) {
    this._name = document.querySelector(userNameElement);
    this._about = document.querySelector(userJobElement);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo({ name, about, id }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._userId = id;
  }

  setUserAvatar(avatar){
    this._avatar.src = avatar;
  }
}
