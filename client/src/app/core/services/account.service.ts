import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Address, User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  currentUser =signal<User| null>(null);

  login(values : any){
    let params = new HttpParams();
    return this.http.post<User>(this.baseUrl + 'account/login', values);
  }

  register(values:any){
    return this.http.post<User>(this.baseUrl+'account/register', values);
  }

  getUserInfo(){
    return this.http.get<User>(this.baseUrl+'account/user-info').subscribe({
      next: user => this.currentUser.set(user)
    })
  }

  logout(){
    this.http.post(this.baseUrl+'account/logout', {});
  }

  updateAddress(address:Address){
    return this.http.post(this.baseUrl+'account/address', address);
  }

}
