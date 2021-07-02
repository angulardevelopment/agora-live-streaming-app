import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  public getRequest(url, params = {}) {
    return this.http.get(url, {params}).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        return this.handleError(err);
      })
    );
  }

  public handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  // rtc token
  async generateTokenAndUid(uid) {
    // https://test-agora.herokuapp.com/access_token?channel=test&uid=1234
    let url = 'https://test-agora.herokuapp.com/access_token?';
    const opts = { params: new HttpParams({ fromString: "channel=test&uid=" + uid }) };
    const data = await this.getRequest(url, opts.params).toPromise();
    return { 'uid': uid, token: data['token'] }

  }

  generateUid() {
    const length = 5;
    const randomNo = (Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)));
    return randomNo;
  }

}
