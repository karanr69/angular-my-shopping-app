import { Component, OnInit,OnDestroy } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import {Router, NavigationEnd} from '@angular/router';
@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit,OnDestroy {
  public products:[];
  mySubscription: any;
  public loadIcon:boolean=true;

  constructor(public restApi: RestApiService,private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
   }

  ngOnInit() {
    this.products=this.restApi.searchResponse;
    if(this.products.length>0){
      this.loadIcon=false;
    }
  }
  productItem(id:any){
    console.log(id);
    this.restApi.productid=id;

  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
