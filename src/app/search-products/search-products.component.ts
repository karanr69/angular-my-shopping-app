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
  public prices:[];
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
    var param;
    this.products=this.restApi.searchResponse;
    if(this.products.length>0){
      this.loadIcon=false;
    }
    this.restApi.getAllProductPriceList(param).subscribe((data:any)=>{
      this.prices = data.response;
    });
  }
  productItem(id:any){
    let param;
    console.log(id);
    this.restApi.productid=id;
    
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
