import { IPagination } from './models/pagination';
import { IProduct } from './models/product';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Client';
  products : IProduct[] = [];
  constructor(private http : HttpClient)
  {

  }
  ngOnInit() : void{
      this.http.get('https://localhost:44377/api/products').subscribe(( res : any) =>{
        this.products = res.data;
        console.log(this.products);

      })
  }
}
