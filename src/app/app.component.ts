import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'video-app';
  hide = true;
  constructor(private router: Router,
    public common: CommonService
  ) {

  }

  ngOnInit(){
    this.common.getAppDetails('test');
    // this.init();
  }

  open(value: number) {
    localStorage.setItem('app', value.toString());
    this.setApp(value);
    if (value == 3) {
      this.router.navigate([`/live`]);
    } else {
      this.router.navigate([`/user/${value}`]);
    }
  }

  setApp(value: number) {
    if (value == 3) {
      this.hide = false;
    } else {
      this.hide = false;
    }
  }

  init(){
    const detail = localStorage.getItem('app');
    if(detail)
    this.setApp(parseInt(detail));
  }
}
