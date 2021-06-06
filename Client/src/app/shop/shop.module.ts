import { ProductsSliderComponent } from './../shared/components/products-slider/products-slider.component';
import { BannerComponent } from './../shared/components/banner/banner.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../material/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ProductDetailesComponent } from './product-detailes/product-detailes.component';
import { HomeComponent } from '../home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailesComponent,
    HomeComponent,
    BannerComponent,
    ProductsSliderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    SharedModule,
    RouterModule,
    CarouselModule.forRoot()
  ],
  exports: [
    ShopComponent,
    SharedModule,
    ProductItemComponent,
    ProductDetailesComponent,
    CarouselModule
  ]
})
export class ShopModule { }
