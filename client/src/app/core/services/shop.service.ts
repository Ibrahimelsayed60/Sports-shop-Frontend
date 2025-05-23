import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from 'postcss';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { Observable } from 'rxjs';
import { ResultDto } from '../../shared/models/ResultDto';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl="https://localhost:7265/api/";
  private http = inject(HttpClient);

  types:string[] = [];
  brands:string[] = [];

  getProducts(shopParams: ShopParams)
  {

    let params = new HttpParams();

    if(shopParams.brands.length > 0)
    {
      params = params.append('brands',shopParams.brands.join(','));
    }

    if(shopParams.types.length > 0)
      {
        params = params.append('types',shopParams.types.join(','));
      }

    if(shopParams.sort)
    {
      params = params.append('sort',shopParams.sort);
    }

    if(shopParams.search)
    {
      params = params.append('search',shopParams.search);
    }

    params = params.append('pageSize', shopParams.pageSize);
    params = params.append('pageIndex', shopParams.pageNumber);

    return this.http.get<ResultDto<Pagination<Product>>>(this.baseUrl + 'products', {params});
  }

  getProduct(id: number)
  {
    return this.http.get<ResultDto<Product>>(this.baseUrl + 'products/' + id);
  }


  getBrands()
  {
    if(this.brands.length > 0) return;
    return this.http.get<ResultDto<string[]>>(this.baseUrl + 'products/brands').subscribe({
      next: response => this.brands = response.data
    });

  }

  getTypes()
  {
    if(this.types.length > 0) return;
    return this.http.get<ResultDto<string[]>>(this.baseUrl + 'products/types').subscribe({
      next: response => this.types = response.data
    })
  }

}
