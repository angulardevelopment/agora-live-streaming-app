
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common.service';
import { StreamService } from '../services/stream.service';
import { TokenInfo } from '../models';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
  // dummyDataUser1: TokenInfo = { uid: 0, token: '' };
  // dummyDataUser2: TokenInfo =   { uid: 0, token: '' };
  hideBtns = true;

  constructor(public stream: StreamService, public api: ApiService, public common: CommonService,
   
  ) {
  }

  ngOnInit() {
    const t = this.common.getRoute();
    console.log(t, 't');
    if(t.includes('user/1')){
      // this.dummyDataUser1.uid = 2882341273;
      // this.dummyDataUser1.token = '00648b158ccc64343cf9973a8f5df311f2aIAAgOtzHEC3QLpZnDUJ25juk+Y6xpS8uLy6Aa8G0Ozbc8rdIfRBXoFHlIgAYHDrI/zN+ZwQAAQCP8HxnAgCP8HxnAwCP8HxnBACP8Hxn';
      // this.common.userCheck ='1';
    } else if(t.includes('user/2')){
      // this.dummyDataUser2.uid = 2882341274;
      // this.dummyDataUser2.token = '00648b158ccc64343cf9973a8f5df311f2aIABSRo8GpX2aXRIhFVvuX02DsaIacHh7rc8b9qo0eHce47dIfRD0NTV7IgBDbClq5DN+ZwQAAQB08HxnAgB08HxnAwB08HxnBAB08Hxn';
      // this.common.userCheck ='2';
    }
  }


  async startCall() {
    this.stream.options.uid = this.common.generateUid();
    const rtcDetails: TokenInfo = await this.common.generateTokenAndUid(this.stream.options.uid);
    this.stream.createRTCClient('');
    this.stream.agoraServerEvents(this.stream.rtc);
    // if(this.common.userCheck == '1'){
      await this.stream.localUser(rtcDetails.token, rtcDetails.uid, '');
    // } else if(this.common.userCheck == '2'){
    //   await this.stream.localUser(this.dummyDataUser2.token, this.dummyDataUser2.uid, '');
    // }
    // await this.stream.localUser(rtcDetails.token, uid, '');

    this.hideBtns = false;
  }



  async logout() {
    await this.stream.leaveCall();
  }


}
