import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import AgoraRTC from 'agora-rtc-sdk-ng';
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

  async mute() {
    this.stream.rtc.localAudioTrack.setEnabled(false);
  }

  unmute() {
    this.stream.rtc.localAudioTrack.setEnabled(true);
  }





  async logout() {
    await this.stream.leaveCall();
  }


}
