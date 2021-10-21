import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // store the employee to browser local storage.
  setItem(key: any, value: any) {
    console.log(value);
    localStorage.setItem(key, value);
  }

  // get the specific employee using id from local storage.
  getItem(id: any) {
    return localStorage.getItem(id);
  }

  // delete the employee from the local storage.
  deleteItem(id: any) {
    localStorage.removeItem(id);
  }

  // checking if employee exist or not.
  isKeyExist(key: any) {
    if (localStorage.getItem(key) === null) {
      return false;
    } else {
      return true;
    }
  }
}
