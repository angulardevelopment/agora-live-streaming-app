
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common.service';
import { StreamService } from '../services/stream.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  hideBtns = true;

  constructor(public stream: StreamService, public api: ApiService, public common: CommonService) {
  }

  ngOnInit() {

  }


  async startCall() {
    const uid = this.common.generateUid();
    const rtcDetails = await this.common.generateTokenAndUid(uid);
    this.stream.createRTCClient('');
    this.stream.agoraServerEvents(this.stream.rtc);
    await this.stream.localUser(rtcDetails.token, uid, '');

    this.hideBtns = false;
  }



  async logout() {
    await this.stream.leaveCall();
  }


}
