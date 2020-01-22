import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public products:[];

  constructor(public restApi: RestApiService) { }

  ngOnInit() {
    this.loadProducts();
  }
  productItem(id:any){
    console.log(id);
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
  });
}
}
