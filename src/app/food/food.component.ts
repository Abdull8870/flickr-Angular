import { Component, OnInit } from '@angular/core';
import { FlickrServiceService } from '../flickr-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-food',
    templateUrl: './food.component.html',
    styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
    loading:boolean;
    pages=[1,2,3,4,5,6,7,8,9,10];
    images = [];
    currentPage: number = 1;
    allImages=[];
    navigation:string;
    private imgSub:Subscription;

    constructor(private flickrService: FlickrServiceService,private router: Router) {}

    ngOnInit(): void {
        this.loading=true;
        this.currentPage=this.flickrService.pageNumber;
        this.initialPagination(this.currentPage);
        console.log(this.currentPage);
        this.flickrService.getFoodImages(this.currentPage).toPromise().then(res => {
            this.images = res;
            this.loading=false;
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


    onChangePage(i: any) {

        this.loading=true;
        let tempPage:number=this.currentPage;
        let tempNav:string=this.navigation;
        if(isNaN(i)){
            if(i=='N') {
                this.currentPage = this.currentPage + 1;
                this.flickrService.pageNumber=this.currentPage;
                this.navigation='N';
            } else if(i=='P'){
                this.currentPage = this.currentPage - 1;
                this.flickrService.pageNumber=this.currentPage;
                this.navigation='P';
            }
        }else {
            this.currentPage = i;
            this.flickrService.pageNumber=this.currentPage;
            this.navigation= i > tempPage ? 'N' : 'P';
        }
        console.log(this.currentPage,tempPage);
        this.changePaination(this.currentPage,tempPage,tempNav);
    }

    changePaination(currPage:number,i:number,tempNav:string) {
        if( currPage % 10 == 0 && currPage > i ) {
            this.loading=true;
            this.pages=[];
            for (let i = currPage; i<=currPage+10 ; i++) {
                this.pages.push(i);
            }
            this.loading=false;
        } else if(currPage % 10 == 0 && currPage < i){
            this.loading=true;
            this.pages=[];
            for (let i = currPage-10; i<=currPage ; i++) {
                if(i>0){
                    this.pages.push(i);
                }
            }
            this.loading=false;
        } else if (i % 10 == 0 && currPage > i && tempNav === 'P'){
            this.loading=true;
            this.pages=[];
            for (let i = currPage-1; i<currPage+10 ; i++) {
                this.pages.push(i);
            }
            this.loading=false;
        } else if (i % 10 == 0 && currPage < i && tempNav === 'N') {
            this.loading=true;
            this.pages=[];
            for (let i = currPage-9 ; i <= currPage+1 ; i++) {
                if(i>0){
                    this.pages.push(i);
                }
            }
            this.loading=false;
        }
        this.flickrService.getFoodImages(currPage).toPromise().then(res => {
            this.images = res;
            this.loading=false;
        });
    }

    initialPagination(i:number){
        while(i%10!=0){
            i++;
        }
        if(i>10) {
            this.pages=[];
            for (let j = i - 10; j <= i; j++) {
                this.pages.push(j);
            }
        }
    }


}
