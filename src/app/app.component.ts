import { Component } from '@angular/core';
import { FlickrServiceService } from './flickr-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  images = [];

  constructor(private flickrService: FlickrServiceService) {
    this.flickrService.getFoodImages(1).toPromise().then(res => {
      this.images = res;
    });

    }
    onClick(){
      this.flickrService.updateObs();
    }
  }

