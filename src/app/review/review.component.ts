import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { FlickrServiceService } from '../flickr-service.service';
import { Images } from '../Modal/images.model';
import { PlatformLocation } from "@angular/common";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
    loading:boolean;
    answer = '';
    id='';
   arr: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   image:Images;
   page:Number;
   constructor(private route: ActivatedRoute,private toastr: ToastrService,
              private router: Router,private flickrService: FlickrServiceService,location:PlatformLocation) {
        location.onPopState(() => {
                this.flickrService.updateObs();
        });
  }

  ngOnInit(): void {
      this.loading=true;
      this.route.queryParams
          .subscribe(
              (queryParams: Params) => {
                  this.id=queryParams['id'];
                  this.page=queryParams['page'];
                  this.image = this.flickrService.getImageDetails(this.id);
                  this.loading=false;
              });
  }


  onRating(form: NgForm) {
      this.router.navigate(['/food']);
      console.log(form.value.givenBy);
      console.log(form.value.options);
      console.log(form.value.Reason);
      this.flickrService.addReview(form.value.options, form.value.givenBy, form.value.Reason, this.id, this.page);
      this.toastr.success('Your rating has been posted successfully','Success', {
          timeOut: 3000,
      });
  }



}
