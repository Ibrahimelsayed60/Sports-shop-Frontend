import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Result } from './shared/models/Result';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{


  baseUrl="https://localhost:7265/api/"
  private http = inject(HttpClient);
  title = 'Tigers Shop';
  products: Product[] = [];

  ngOnInit(): void {
    this.http.get<Result<Pagination<Product>>>(this.baseUrl + 'products').subscribe({
      next:response => this.products = response.data.data,
      error: error => console.log(error),
      complete: () => console.log('complete')
    })
  }

}
