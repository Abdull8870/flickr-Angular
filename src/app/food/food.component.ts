import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlickrServiceService } from '../flickr-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit ,OnDestroy{
   loading:boolean;
   pages=[1,2,3,4];
   images = [];
   currentPage: Number = 1;
   allImages=[];
   private imgSub:Subscription;

  constructor(private flickrService: FlickrServiceService,private router: Router) {}

  ngOnInit(): void {
      this.loading=true;
   console.log("onInit");
   this.imgSub = this.flickrService.getAllImageAsObservable().subscribe(res => {
       console.log(res);
       this.allImages=res.allImg;
       let page:Number=res.page;
       this.onChangePage(page);
    });
  }


  onClick(id: string, title: string, url: string){
    console.log(id +' '+ title +' '+ url);
    let obj={
      id:id,
      title:title,
      url:url
    };
    this.router.navigate(['/review'],  { queryParams: { id: id ,page:this.currentPage} });
  }


  onChangePage(i: Number) {

      this.currentPage = i;
      let temp= this.allImages;
      console.log(temp);

    switch (i) {
        case 1:
            this.images=temp.slice(0,9);
            console.log(i);
            console.log(this.images);
            this.loading=false;
            break;
        case 2:
            this.images=temp.slice(9,18);
            this.loading=false;
            break;
        case 3:
            this.images=temp.slice(18,27);
            this.loading=false;
            break;
        case 4:
            this.images=temp.slice(27,30);
            this.loading=false;
            break;
        default:
            this.loading=false;
            break;
    }

  }


  ngOnDestroy(){
      console.log('onDestroy');
    this.imgSub.unsubscribe();
  }
}
