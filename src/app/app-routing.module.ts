import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import {ProductPageComponent} from './product-page/product-page.component'

const routes: Routes = [
{ path: 'home', component: HomeComponent},
{path: 'search', component: SearchProductsComponent},
{path: 'home/product-page', component: ProductPageComponent},
{path: 'search/product-page', component: ProductPageComponent},
{ path: '**', redirectTo: '/home', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
