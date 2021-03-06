import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showAnnouncement = true;

  constructor() {
    if (environment.production){
      console.log('production mode');
    }else{
      console.log('development mode');
      console.log(environment.apiUrl);
    }
  }

  hideAnnouncement(): void{
    this.showAnnouncement = false;
  }
}
