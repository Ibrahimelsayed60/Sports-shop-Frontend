import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Order, OrderToCreate } from '../../shared/models/order';
import { ResultDto } from '../../shared/models/ResultDto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  orderComplete = false;

  createOrder(orderToCreate:OrderToCreate){
    return this,this.http.post<ResultDto<Order>>(this.baseUrl+'orders', orderToCreate);
  }


  getOrdersForUser(){
    return this.http.get<ResultDto<Order[]>>(this.baseUrl+'orders');
  }

  getOrderDetailed(id:number){
    return this.http.get<ResultDto<Order>>(this.baseUrl+'orders/'+id);
  }

}
