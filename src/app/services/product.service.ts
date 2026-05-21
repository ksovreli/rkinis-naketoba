import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { Product } from '../models/product.model';
import { finalize, first, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private request = inject('REQUEST' as any, { optional: true }) as any;

  private jsonUrl = 'data/products.json';

  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);

  loadProducts(): void {
    if (this.products().length > 0 || this.isLoading()) return;
    this.isLoading.set(true);

    // 🎯 ყველაზე მარტივი და მუშა ვერსია: 
    // ყოველთვის გამოიყენე ფარდობითი გზა. 
    // Angular/SSR ამას მშვენივრად ამუშავებს როგორც ლოკალურად, ისე ჰოსტინგზე.
    const finalUrl = '/data/products.json';

    this.http.get<Product[]>(finalUrl)
      .pipe(
        first(),
        catchError((err) => {
          console.error('მონაცემები ვერ ჩაიტვირთა:', err);
          return of([]);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((data) => {
        const formattedData = data.map(p => ({
          ...p,
          imageUrl: p.imageUrl.startsWith('http') || p.imageUrl.startsWith('images/')
            ? p.imageUrl
            : `images/${p.imageUrl}`
        }));
        this.products.set(formattedData);
      });
  }
}