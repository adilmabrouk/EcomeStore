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




@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    ShopComponent
  ]
})
export class ShopModule { }
