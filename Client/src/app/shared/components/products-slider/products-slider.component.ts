import { IProduct } from './../../models/product';
import { ShopService } from './../../../shop/shop.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.css']
})
export class ProductsSliderComponent implements OnInit {
  products!: IProduct[];
  itemsPerSlide = 3;
  singleSlideOffset = false;
  noWrap = false;
  slidesChangeMessage = '';
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts()
  {
    this.shopService.getProducts().subscribe(response => {
      this.products = response.data;
      console.log(this.products);
    });
  }
}
