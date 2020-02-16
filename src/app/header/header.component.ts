import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import {Router,ActivatedRoute} from '@angular/router';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
//import { relative } from 'path';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
selectedFile:File=null;
public activeClass:boolean=false;
 //Lets initiate Record OBJ
 private record;
 //Will use this flag for detect recording
 private recording = false;
 //Url of Blob
 private url;
 private error;
 public audiotext:string;
 public flag:boolean=false;
  constructor(public restApi: RestApiService,private router: Router,private domSanitizer: DomSanitizer,private toastr: ToastrService,private route:ActivatedRoute,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    
  }

  searchProduct(value){
    var param=value
    this.restApi.searchResponse=[];
    this.spinner.show();
  this.restApi.getAllProductList(param).subscribe((data: any) => {
    //for(var item in data.response){
     // console.log(data.response[item].ITEM_NUMBER);
    //}
    
    this.restApi.searchResponse = data.response;
    if(data.response.length>0){
      this.spinner.hide();
      this.router.navigate(['search']);
      this.toastr.success("Search Results");
      
    }else{
      this.router.navigateByUrl('/home');
      this.spinner.hide();
      this.toastr.warning("No Result found for the search item");

    }
  });
}
onFileSelected(event){
  this.spinner.show();
  this.selectedFile =<File>event.target.files[0];
  const fd=new FormData();
  fd.append('file',this.selectedFile,this.selectedFile.name);
  this.restApi.uploadFile(fd).subscribe((data: any) => {
    
    event.srcElement.value = null;
    var className:string;
    if(data.images[0].classifiers[0].classes.length>0){
    className=data.images[0].classifiers[0].classes[0].className;
    if(className){
      this.audiotext=className;
      this.searchProduct(className);
    }
  }else{
    this.spinner.hide();
    this.toastr.warning("No Result found for the uploaded item");
  }
  });
  //console.log(event);
}

sanitize(url:string){
  return this.domSanitizer.bypassSecurityTrustUrl(url);
}
/**
* Start recording.
*/
initiateRecording() {
  this.activeClass=true;
  this.recording = true;
  this.audiotext='';
  let mediaConstraints = {
      video: false,
      audio: true
  };
  navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
}
/**
* Will be called automatically.
*/
successCallback(stream) {
  var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1
  };
  //Start Actuall Recording
  var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
  this.record = new StereoAudioRecorder(stream, options);
  
  this.record.record();
  this.ionViewDidLoad();
}
/**
* Stop recording.
*/
ionViewDidLoad(){
  setTimeout(() => {
    this.stopRecording();
    this.spinner.show();

  }, 2000);
  
}
stopRecording() {
  this.recording = false;
  this.activeClass=false;
  this.record.stop(this.processRecording.bind(this));
 // RecordRTC.save(this.record);
}
/**
* processRecording Do what ever you want with blob
* @param  {any} blob Blog
*/

processRecording(blob) {
  //this.url = URL.createObjectURL(blob);
  let metadata = {
    type: 'audio/wav'
  };
  let file = new File([blob],'audio',metadata);
  console.log(file);
  const fd=new FormData();
  fd.append('file',file,file.name);
  
  this.restApi.uploadAudioFile( fd).subscribe((data: any) => {
    console.log(data);
    this.record=null;
    var transcript:string;
    if(data.results.length>0){
      transcript=data.results[0].alternatives[0].transcript;
      this.audiotext=transcript;
      this.searchProduct(transcript);
      
    }else{
      this.spinner.hide();
      this.toastr.error("cannot recognise the audio");
      
    }
   // event.srcElement.value = null;
    /*var className:string;
    if(data.images[0].classifiers[0].classes.length>0){
    className=data.images[0].classifiers[0].classes[0].className;
    if(className){
      this.searchProduct(className);
    }
  }else{
    window.alert("No result Found");
  }*/
  });
}
/**
* Process Error.
*/
errorCallback(error) {
  this.error = 'Can not play audio in your browser';
}
  }

