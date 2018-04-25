import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() {}

  private _tokenKey = 'doToken';
  private _callbackKey = 'callbackKey';

  get token(): string {
    return localStorage.getItem(this._tokenKey);
  }

  set token(token: string) {
    localStorage.setItem(this._tokenKey, token);
  }

  clearToken() {
    localStorage.removeItem(this._tokenKey);
  }



  get callBackURL(): string {
    return localStorage.getItem(this._callbackKey);
  }

  set callBackURL(token: string) {
    localStorage.setItem(this._callbackKey, token);
  }

  clearCallback() {
    localStorage.removeItem(this._callbackKey);
  }


}
