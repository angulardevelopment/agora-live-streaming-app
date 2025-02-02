import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StreamService } from './stream.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // userCheck = '0';
  constructor(public api: ApiService,  public route: ActivatedRoute, private router: Router,
    public stream: StreamService
  ) { }

  // rtc token
  async generateTokenAndUid(uid: number) {
    const url = 'https://agora-tokens-80k1.onrender.com/rtcToken'
        const opts = {
      params: new HttpParams({ fromString:  'channelName=test&uid=' + uid }),
    };
    const data = await this.api.getRequest(url, opts.params).toPromise();
    console.log(data, 'generateTokenAndUid')
    return { uid: uid, token: data['key'] };
  }

  generateUid() {
    const length = 5;
    const randomNo = (Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)));
    return randomNo;
  }

  getRoute(){
    this.route.paramMap.subscribe( paramMap => {
      // console.log(paramMap)
      // this.bankName = paramMap.get('bank');
  })
  // console.log(this.router.url);
  return this.router.url;
  }

  async getAppDetails(channelName) {
    const url = 'https://agora-tokens-80k1.onrender.com/appDetails'
    const opts = {
  params: new HttpParams({ fromString:  'channelName='+channelName }),
};
const data = await this.api.getRequest(url, opts.params).toPromise();
console.log(data, 'getAppDetails')
this.stream.options.appId = data['appid'];
this.stream.options.channel = data['channelName'];
  }
}
