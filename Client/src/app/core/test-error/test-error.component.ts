import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {

  baseURL = environment.apiURL;
  validationErrors: any;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  get404Error()
  {
    this.http.get(this.baseURL+'products/0').subscribe(response =>
    {
      console.log(response);

    },
    error=>{
      console.log(error);

    });
  };

  get500Error()
  {
    this.http.get(this.baseURL+'buggy/servererror').subscribe(response =>
    {
      console.log(response);

    },
    error=>{
      console.log(error);

    });
  };

  get400Error()
  {
    this.http.get(this.baseURL+'buggy/badrequest').subscribe(response =>
    {
      console.log(response);

    },
    error=>{
      console.log(error);

    });
  };


  get400ErrorValidation()
  {
    this.http.get(this.baseURL+'buggy/badrequest/five').subscribe(response =>
    {
      console.log(response);

    },
    error=>{
      console.log(error);
      this.validationErrors = error.errors;

    });
  };
}
