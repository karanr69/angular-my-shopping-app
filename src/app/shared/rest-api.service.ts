import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map,retry, catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'https://my-shopping-b-dao-sahal.gamification-d3c0cb24e2b77f6869027abe3de4bca3-0001.sng01.containers.appdomain.cloud';
  headers: HttpHeaders;  
  options: any;
  public productid:string;
 
 /* invokeFirstComponentFunction = new EventEmitter();    
  subsVar: Subscription;*/
  constructor(private http: HttpClient) {
    
   }
   /*onFirstComponentButtonClick(val:string) {    
    this.invokeFirstComponentFunction.emit(val);    
  }*/
  public searchResponse:[];
   private extractData(res: Response) {
    let body = res;
    return body || { };
  }
   // HttpClient API get() method => Fetch product list
 getAllProductList(param:any): Observable<any> {
   var url:string;
   if(param)
   url=this.apiURL + '/api/getproducts/desc/'+param.toLowerCase();
   else
   url=this.apiURL + '/api/getproducts';
  return this.http.get<any>(url)
  .pipe(map(this.extractData),
    retry(1),
    catchError(this.handleError)
  )
}

   // HttpClient API get() method => Fetch product list
   getAllProductPriceList(param:any): Observable<any> {
    var url:string;
    url=this.apiURL + '/api/getproducts/price';
   return this.http.get<any>(url)
   .pipe(map(this.extractData),
     retry(1),
     catchError(this.handleError)
   )
 }

getAllSearchProductList(param:any): Observable<any> {
  var url:string;
  if(param)
  url=this.apiURL + '/api/getproducts/desc/'+param.toLowerCase();
  else
  url=this.apiURL + '/api/getproducts';
 return this.http.get<any>(url)
 .pipe(map(this.extractData),
   retry(1),
   catchError(this.handleError)
 )
}
getProduct(param:any): Observable<any> {
  var url:string;
  if(param){url=this.apiURL + '/api/getproducts/id/'+param;
 return this.http.get<any>(url)
 .pipe(map(this.extractData),
   retry(1),
   catchError(this.handleError)
 )}
}

getPrice(param:any): Observable<any> {
  var url:string;
  if(param){url=this.apiURL + '/api/getproducts/price/'+param;
  
 return this.http.get<any>(url)
 .pipe(map(this.extractData),
   retry(1),
   catchError(this.handleError)
 )}
}
getStyle(param:any): Observable<any> {
  var url:string;
  if(param){url=this.apiURL + '/api/getproducts/style/'+param;
 return this.http.get<any>(url)
 .pipe(map(this.extractData),
   retry(1),
   catchError(this.handleError)
 )}
}
uploadFile(param:any): Observable<any> {
  var url:string;
 
  url='https://my-shopping-stt-sahal.gamification-d3c0cb24e2b77f6869027abe3de4bca3-0001.sng01.containers.appdomain.cloud/uploadImage';
  
 return this.http.post<any>(url,param)
 .pipe(map(this.extractData),
   retry(1),
   catchError(this.handleError)
 )
}

uploadAudioFile(param:any): Observable<any> {
  var url:string;
 
  url='https://my-shopping-stt-sahal.gamification-d3c0cb24e2b77f6869027abe3de4bca3-0001.sng01.containers.appdomain.cloud/uploadFile';
  
 return this.http.post<any>(url,param)
 .pipe(map(this.extractData),
   retry(1),
   catchError(this.handleError)
 )
}
// Error handling 
handleError(error) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}
}
