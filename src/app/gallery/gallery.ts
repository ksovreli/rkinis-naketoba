import { Component, computed, inject, signal, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { SeoService } from '../services/seo';

@Component({
  selector: 'app-gallery',
  // ფაქტორი: NgOptimizedImage პერფორმანსისთვის
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery implements OnInit {
  public productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seo = inject(SeoService);
  
  private isBrowser: boolean;
  selectedCategory = signal<string>('ყველა');
  selectedImage = signal<any | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.productService.loadProducts();
    
    this.route.params.subscribe(params => {
      const cat = params['category'] ? decodeURIComponent(params['category']) : 'ყველა';
      this.selectedCategory.set(cat);
      
      this.seo.updateMeta({
        title: cat === 'ყველა' ? 'ჩვენი ნამუშევრები' : cat,
        description: `${cat} - უმაღლესი ხარისხის რკინის ნაკეთობების ფართო არჩევანი. დაათვალიერეთ ჩვენი გალერეა.`,
        image: `/images/og-${cat === 'ყველა' ? 'main' : cat.toLowerCase()}.jpg`
      });
    });
  }

  categories = computed(() => {
    const cats = this.productService.products().map(p => p.category);
    return ['ყველა', ...new Set(cats)];
  });

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const allProducts = this.productService.products();

    const filtered = category === 'ყველა'
      ? allProducts
      : allProducts.filter(p => p.category === category);

    const counters: { [key: string]: number } = {};
    return filtered.map(item => {
      counters[item.category] = (counters[item.category] || 0) + 1;
      return {
        ...item,
        customTitle: `${item.category} #${counters[item.category]}`
      };
    });
  });

  setCategory(category: string) {
    if (this.selectedCategory() === category) return;
    const target = category === 'ყველა' ? ['/ჩვენი-ნამუშევრები'] : ['/ჩვენი-ნამუშევრები', category];
    this.router.navigate(target);
  }

  openImage(item: any) {
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
    this.selectedImage.set(item);
  }

  closeImage() {
    if (this.isBrowser) {
      document.body.style.overflow = 'auto';
    }
    this.selectedImage.set(null);
  }
}