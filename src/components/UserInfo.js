export default class UserInfo {
  constructor(userName, aboutUser , userAvatar) {
    this._userName = userName;
    this._aboutUser = aboutUser
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._aboutUser.textContent
    };
  }

  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._aboutUser.textContent = about;
  }

  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}
