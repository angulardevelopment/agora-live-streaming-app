import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'video-app';
  
  constructor(private router: Router,
    public common: CommonService
  ) {

  }

  ngOnInit(){
    this.common.getAppDetails('test');
  this.common.init(); 
  }

  open(value: number) {
    localStorage.setItem('app', value.toString());
    if (value == 3) {
      this.router.navigate([`/live`]);
    } else {
      this.router.navigate([`/user/${value}`]);
    }
  }

}
