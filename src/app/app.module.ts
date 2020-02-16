import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LogoPartnerComponent } from './logo-partner/logo-partner.component';
import { HeaderComponent } from './header/header.component';
import { RestApiService } from "./shared/rest-api.service";
import { HomeComponent } from './home/home.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LogoPartnerComponent,
    HeaderComponent,
    HomeComponent,
    SearchProductsComponent,
    ProductPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
	ToastrModule.forRoot()
  ],
  providers: [RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
