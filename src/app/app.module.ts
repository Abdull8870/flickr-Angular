import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FoodComponent } from './food/food.component';
import { ReviewComponent } from './review/review.component';
import { ButtonsModule, WavesModule, CardsModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    ReviewComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(
        {
          positionClass: 'toast-top-right',
          preventDuplicates: true
        }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
