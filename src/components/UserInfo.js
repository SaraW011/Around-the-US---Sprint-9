export default class UserInfo {
  constructor({ userNameElement, userJobElement, avatar }) {
    this._userNameElement = userNameElement;
    this._userJobElement = userJobElement;
    this._avatar = avatar
  }

  getUserInfo() {
    this._userData = {
      name: this._userNameElement.textContent,
      job: this._userJobElement.textContent,
    };
    return this._userData;
  }

  setUserInfo({inputName, inputJob}) {
    this._userNameElement.textContent = inputName;
    this._userJobElement.textContent = inputJob;
  }

  setUserAvatar(avatar){
    this._avatar.src = avatar;
  }
}