import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PhotoArrayModel } from './Modal/photoArray.model';
import { Photo } from './Modal/photo.model';
import { Subject } from "rxjs";
import { Images } from './Modal/images.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FlickrServiceService {
     auth:boolean=true;
     private allImgObs=new Subject<{allImg:Images[],page:Number}>();
     url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&`;
     private allImages :Images[];

    constructor(private http: HttpClient,private router: Router) { }


  getFoodImages(currPage) {
    const params = `api_key=${environment.key}&text=food&format=json&nojsoncallback=1&per_page=30&page=${currPage}&sort=date-posted-asc`;
    return this.http.get(this.url + params).pipe(map((res: PhotoArrayModel) => {
      console.log(res);
      let urlArr:Images[] = [];
      res.photos.photo.forEach((photo: Photo) => {
        const photoObj = {
          url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`,
          title: photo.title,
          id: photo.id,
          rating: null,
          givenBy: '',
          reason: ''
        };
         urlArr.push(photoObj);
      });
      this.allImages=urlArr;
      this.allImgObs.next({allImg:[...urlArr],page:1});
        this.auth=false;
      return urlArr;
    }));
  }


    getImageDetails(id:string){
       let imageArr= this.allImages.filter(x=>{
           return x.id==id;
       });
       return imageArr[0];
   }

    addReview(rating: Number, givenBy: string, reason: string, id: string, pageNum: Number){
           let index=this.allImages.findIndex(x=>{
               console.log(x.id+'   '+id);
               return x.id==id;
           });
        this.allImages[index].rating = rating;
        this.allImages[index].givenBy = givenBy;
        this.allImages[index].reason = reason;
        this.postImageDetailsInDB();
        setTimeout(() => {
            this.allImgObs.next({allImg:[...this.allImages], page: Number(pageNum)});
        }, 1000);
    }


   getAllImageAsObservable(){
        console.log('inside');
        return this.allImgObs.asObservable();
   }

   postImageDetailsInDB() {
        this.http.delete('https://backend-3616e.firebaseio.com/post/-MTiHhAl-ju5hqUjPVZw.json').subscribe((res:{name:string})=>{

        },err=>{
            console.log(err);
        });
   }

   getImages(){
        this.http.get('https://backend-3616e.firebaseio.com/post/-MTiHhAl-ju5hqUjPVZw.json')
            .subscribe(res=>{
                console.log(res);
            },err=>{
                console.log(err);
            });
   }

   updateObs(){
       setTimeout(() => {
           this.allImgObs.next({allImg:[...this.allImages],page:1});
       }, 1000);
   }

   canAllow(){
        return this.auth;
   }
}
