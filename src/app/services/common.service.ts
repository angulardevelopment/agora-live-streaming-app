import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userCheck = '0';
  constructor(public api: ApiService,  public route: ActivatedRoute, private router: Router) { }

  // rtc token
  // async generateTokenAndUid(uid) {
  //   // https://test-agora.herokuapp.com/access_token?channel=test&uid=1234
  //   let url = 'https://test-agora.herokuapp.com/access_token?';
  //   const opts = { params: new HttpParams({ fromString: "channel=test&uid=" + uid }) };
  //   const data = await this.api.getRequest(url, opts.params).toPromise();
  //   return { 'uid': uid, token: data['token'] }

  // }

  // generateUid() {
  //   const length = 5;
  //   const randomNo = (Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)));
  //   return randomNo;
  // }

  getRoute(){
    this.route.paramMap.subscribe( paramMap => {
      // console.log(paramMap)
      // this.bankName = paramMap.get('bank');
  })
  // console.log(this.router.url);
  return this.router.url;
  }
}
