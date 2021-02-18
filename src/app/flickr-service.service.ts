import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PhotoArrayModel } from './Modal/photoArray.model';
import { Photo } from './Modal/photo.model';
import { Subject } from "rxjs";
import { Images } from './Modal/images.model';
import { Review } from './Modal/review.model';
import { Router } from '@angular/router';
import {forEach} from "@angular-devkit/schematics";


@Injectable({
    providedIn: 'root'
})
export class FlickrServiceService {
    auth:boolean=true;
    public pageNumber:number=1;
    private allImgObs=new Subject<{allImg:Images[],page:Number}>();
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&`;
    private allImages :Images[];
    private allImagesReview :Review[]=[];
    constructor(private http: HttpClient,private router: Router) { }


    getFoodImages(currPage) {
        const params = `api_key=${environment.key}&text=food&format=json&nojsoncallback=1&per_page=30&page=${currPage}&sort=date-posted-asc`;
        return this.http.get(this.url + params).pipe(map((res: PhotoArrayModel) => {
            let urlArr:Images[] = [];
            res.photos.photo.forEach((photo: Photo) => {
                const photoObj = {
                    url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`,
                    title: photo.title,
                    id: photo.id,
                    rating: null,
                    givenBy: '',
                    reason: '',
                    review:false
                };
                urlArr.push(photoObj);
            });
            this.allImages=urlArr;
            this.allImgObs.next({allImg:[...urlArr],page:1});
            this.auth=false;
            return this.checkReview(this.allImages);
        }));
    }


    getImageDetails(id:string){
        let imageArr= this.allImages.filter(x=>{
            return x.id==id;
        });
        return imageArr[0];
    }

    addReview(rating: Number, givenBy: string, reason: string, id: string, pageNum: Number){

        let review = {
            id: id,
            rating: rating,
            givenBy: givenBy,
            reason: reason
        };
        this.allImagesReview.push(review);
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

    checkReview(allImages:Images[]) {
        let isReviewPresent:boolean=false;
        let allImgArray:Images[]=[];
        if( this.allImagesReview.length > 0) {
            allImages.forEach((x) => {
                this.allImagesReview.forEach((y) => {
                    if(x.id===y.id) {
                        x.rating=y.rating;
                        x.givenBy=y.givenBy;
                        x.reason=y.reason;
                        x.review=true
                        allImgArray.push(x);
                        isReviewPresent=true;
                    }else {
                        isReviewPresent=false;
                    }
                });
                if(!isReviewPresent && !x.review) {
                    allImgArray.push(x);
                }
            });
            return allImgArray;
        }
        else {
            return allImages;
        }
    }



}
