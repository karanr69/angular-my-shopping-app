import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kool-shopping';
  constructor(private toastr: ToastrService) { }

  openForm(){
    window.open('https://assistant-chat-us-east.watsonplatform.net/web/public/8740773e-7ff7-44df-b840-9a502e820678');

  }
}
