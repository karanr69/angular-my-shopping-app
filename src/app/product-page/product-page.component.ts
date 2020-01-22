import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,public restApi: RestApiService) { }
private sub:any;
productid:string;
private page:any;
  ngOnInit() {
    this.productid=this.restApi.productid;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
