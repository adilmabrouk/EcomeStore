import { map } from 'rxjs/operators';
import { ITypes } from './../shared/models/productTypes';
import { IBrands } from './../shared/models/productBrands';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl : string = 'https://localhost:44377/api/';

  constructor(private http : HttpClient) { }

  getProducts(brandId?: number, typeId?: number, sort?:string, search?:string, pageNumber?: number, pageSize?: number)
  {
    let params = new HttpParams();



    if(typeId)
    {
       params = params.append('typeId', typeId.toString());
    }

    if(brandId)
    {
       params = params.append('brandId', brandId.toString());
    }

    if(sort)
    {
       params = params.append('sort', sort);
    }

    if(pageNumber)
    {
      params = params.append('pageIndex' , pageNumber.toString());
    }

    if(pageSize)
    {
      params = params.append('pageIndex' , pageSize.toString());
    }

    if(search)
    {
      params = params.append('search' , search);
    }


    return this.http.get<any>(this.baseUrl + 'products',{observe : 'response' , params}).pipe(
      map(response => {
        return response.body;
      })
    )
  }

  getBrands()
  {
    return this.http.get<IBrands[]>(this.baseUrl + 'products/brands');
  }

  getTypes()
  {
    return this.http.get<ITypes[]>(this.baseUrl + 'products/types');
  }
}
