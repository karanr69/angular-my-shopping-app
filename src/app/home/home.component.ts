import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public products:[];
  public prices:[];
  public product:[];
  public loadIcon:boolean=true;
  constructor(public restApi: RestApiService) { }

  ngOnInit() {
    
    this.loadProducts();
    if(this.products.length>0){
      this.loadIcon=false;
    }
  }
  productItem(id:any){
    //console.log(id);
    this.restApi.productid=id;

  }
// Get All Product list
loadProducts() {
var param;
  this.restApi.getAllProductList(param).subscribe((data: any) => {
    //for(var item in data.response){
     // console.log(data.response[item].ITEM_NUMBER);
    //}
    
    this.products = data.response;
    this.restApi.getAllProductPriceList(param).subscribe((data:any)=>{
      this.prices = data.response;
    });
    //this.toastr.error("Hello, I'm the toastr message.")
  });

  

}
}
