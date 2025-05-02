import { inject, Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { Cart } from '../../shared/models/cart';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  baseUrl = environment.apiUrl;
  private cartService = inject(CartService);
  private http = inject(HttpClient);
  private stripePromise: Promise<Stripe | null>;
  private elements?: StripeElements;

  constructor(){
    this.stripePromise = loadStripe(environment.stripePublicKey);
  }

  getStripeInstance(){
    return this.stripePromise;
  }

  async initializeElements(){
    if(!this.elements){
      const stripe = await this.getStripeInstance();
      if(stripe){
        const cart = await firstValueFrom(this.createOrUpdatePaymentIntent());
        this.elements = stripe.elements({clientSecret: cart.clientSecret, appearance:{labels:'floating'}})
      }

    } else{
      throw new Error('stripe has not been loaded');
    }

    return this.elements;
  }

  createOrUpdatePaymentIntent(){
    const cart = this.cartService.cart();
    if(!cart) throw new Error('Problem with cart');
    return this.http.get<Cart>(this.baseUrl + 'payments/' + cart.id, {}).pipe(
      map(cart => {
        this.cartService.cart.set(cart);
        return cart;
      })
    );
  }

}
