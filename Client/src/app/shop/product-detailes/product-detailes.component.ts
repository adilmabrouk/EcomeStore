import { ShopService } from './../shop.service';
import { IProduct } from 'src/app/shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detailes',
  templateUrl: './product-detailes.component.html',
  styleUrls: ['./product-detailes.component.css']
})
export class ProductDetailesComponent implements OnInit {

  product!: IProduct;
  constructor( private shopService : ShopService , private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

    this.loadProduct();
  }

  loadProduct()
  {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.shopService.getProductById(id).subscribe(product =>{
      this.product = product;
    },
    error =>
    {
      console.log(error);
    })
  }

}
