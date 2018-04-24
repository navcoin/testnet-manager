import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() {}

  getToken() {
    return localStorage.getItem('doToken');
  }

  setToken(token: string) {
    localStorage.setItem('doToken', token);
  }

  clearToken() {
    localStorage.removeItem('doToken');
  }

}
