import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ProductDetailesComponent } from './shop/product-detailes/product-detailes.component';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'' , component : HomeComponent},
  {path:'shop' , component : ShopComponent},
  {path:'test-error' , component : TestErrorComponent},
  {path:'notfound' , component : NotFoundComponent},
  {path:'server-error' , component : ServerErrorComponent},
  {path:'product/:id' , component : ProductDetailesComponent},
  {path:'**' , redirectTo:'notfound', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
