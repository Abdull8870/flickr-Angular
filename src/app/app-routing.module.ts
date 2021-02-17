import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FoodComponent } from './food/food.component';
import { ReviewComponent } from './review/review.component';


const appRoutes: Routes = [
    { path: '', redirectTo: 'food', pathMatch: 'full' },
    { path: 'food', component: FoodComponent },
    { path: 'review', component: ReviewComponent },
    { path: 'not-found', component: FoodComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
