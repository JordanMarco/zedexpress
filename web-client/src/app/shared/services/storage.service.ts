import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var require: any;
var CryptoJS = require('crypto-js');

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  init() {
    Storage.prototype['_setItem'] = Storage.prototype.setItem;
    Storage.prototype['_getItem'] = Storage.prototype.getItem;
    Storage.prototype['_removeItem'] = Storage.prototype.removeItem;

    Storage.prototype.setItem = function (key, value) {
      this['_setItem'](
        CryptoJS.RIPEMD160(key).toString(),
        CryptoJS.AES.encrypt(value, environment.ssv).toString()
      );
    };

    Storage.prototype.getItem = function (key) {
      const skey = CryptoJS.RIPEMD160(key).toString();
      let value = this['_getItem'](skey);
      if (value && value != 'null' && value != 'undefined') {
        try {
          return CryptoJS.AES.decrypt(value, environment.ssv).toString(
            CryptoJS.enc.Utf8
          );
        } catch (error) {
          return null;
        }
      } else {
        return null;
      }
    };

    Storage.prototype.removeItem = function (key) {
      this['_removeItem'](CryptoJS.RIPEMD160(key).toString());
    };
  }
}
