import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,public restApi: RestApiService) {
   
   }
private sub:any;
public products:any;
public similarproduct:any;
public product1=[{"ITEM_NUMBER":"1001","DESCRIPTION":"Reflex Womenâ€™s Track Jacket","LONG_DESCRIPTION":"90 Degree By Reflex Womenâ€™s Lightweight, Full Zip Running Track Jacket","CATALOGUE_CATEGORY":"53102901","SKU_UNIT_OF_MEASURE":"Each","STYLE_ITEM":"1000","SKU_ATTRIBUTE1":"Size","SKU_ATTRIBUTE2":"Color","SKU_ATTRIBUTE3":null,"SKU_ATTRIBUTE4":null,"SKU_ATTRIBUTE5":null,"SKU_ATTRIBUTE6":null,"SKU_ATTRIBUTE_VALUE1":"Medium","SKU_ATTRIBUTE_VALUE2":"Black","SKU_ATTRIBUTE_VALUE3":null,"SKU_ATTRIBUTE_VALUE4":null,"SKU_ATTRIBUTE_VALUE5":null,"SKU_ATTRIBUTE_VALUE6":null}];
public product2=[{"PRICE_ID":"1","ITEM_NUMBER":"1001","LIST_PRICE":"39.33","DISCOUNT":"0.05","IN_STOCK":"Yes","PRICE_EFFECTIVE_DATE":"2029-09-19T00:00:00.000Z"}];
public product3=[{"ITEM_NUMBER":"1000","DESCRIPTION":"Reflex Womenâ€™s Track Jacket","LONG_DESCRIPTION":"90 Degree By Reflex Womenâ€™s Lightweight, Full Zip Running Track Jacket","CATALOGUE_CATEGORY":"53102901","BRAND":"Reflex"}];
productid:string;
private page:any;
  ngOnInit() {
   
      this.product1=[{"ITEM_NUMBER":"1001","DESCRIPTION":"Reflex Womenâ€™s Track Jacket","LONG_DESCRIPTION":"90 Degree By Reflex Womenâ€™s Lightweight, Full Zip Running Track Jacket","CATALOGUE_CATEGORY":"53102901","SKU_UNIT_OF_MEASURE":"Each","STYLE_ITEM":"1000","SKU_ATTRIBUTE1":"Size","SKU_ATTRIBUTE2":"Color","SKU_ATTRIBUTE3":null,"SKU_ATTRIBUTE4":null,"SKU_ATTRIBUTE5":null,"SKU_ATTRIBUTE6":null,"SKU_ATTRIBUTE_VALUE1":"Medium","SKU_ATTRIBUTE_VALUE2":"Black","SKU_ATTRIBUTE_VALUE3":null,"SKU_ATTRIBUTE_VALUE4":null,"SKU_ATTRIBUTE_VALUE5":null,"SKU_ATTRIBUTE_VALUE6":null}];
      this.product2=[{"PRICE_ID":"1","ITEM_NUMBER":"1001","LIST_PRICE":"39.33","DISCOUNT":"0.05","IN_STOCK":"Yes","PRICE_EFFECTIVE_DATE":"2029-09-19T00:00:00.000Z"}];
      this.product3=[{"ITEM_NUMBER":"1000","DESCRIPTION":"Reflex Womenâ€™s Track Jacket","LONG_DESCRIPTION":"90 Degree By Reflex Womenâ€™s Lightweight, Full Zip Running Track Jacket","CATALOGUE_CATEGORY":"53102901","BRAND":"Reflex"}];
    if(this.restApi.productid == null){
      this.productid="1001";
    }else{
    this.productid=this.restApi.productid;
    }console.log(this.productid);
    this.loadDescription(this.productid);
  }
  loadDescription(productID:string){
    var param = productID;
    this.restApi.getProduct(param).subscribe((data: any) => {
      for(var item in data.response){
        console.log(data.response[item].ITEM_NUMBER);
      }
      
      this.product1 = data.response;
      console.log(this.product1[0].LONG_DESCRIPTION);
      let description=this.product1[0].LONG_DESCRIPTION;
      if(description!=null){
        this.restApi.getAllSearchProductList(description).subscribe((data:any)=>{
         this.products=data.response;

        });
      }
      
      //this.toastr.error("Hello, I'm the toastr message.")
    });
    this.restApi.getPrice(param).subscribe((data: any) => {
      //for(var item in data.response){
       // console.log(data.response[item].ITEM_NUMBER);
      //}
      
      this.product2 = data.response;
      
      //this.toastr.error("Hello, I'm the toastr message.")
    });
    this.restApi.getStyle(this.product1[0].STYLE_ITEM).subscribe((data: any) => {
      //for(var item in data.response){
       // console.log(data.response[item].ITEM_NUMBER);
      //}
      
      this.product3 = data.response;
      
      //this.toastr.error("Hello, I'm the toastr message.")
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
