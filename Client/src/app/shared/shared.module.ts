import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagerComponent } from './components/pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BannerComponent } from './components/banner/banner.component';
import { ProductsSliderComponent } from './components/products-slider/products-slider.component';


@NgModule({
  declarations: [
    PagerComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PagerComponent,
    CarouselModule
  ]
})
export class SharedModule { }
