import { Component, computed, inject, signal, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage, DOCUMENT } from '@angular/common'; // დაემატა DOCUMENT
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { SeoService } from '../services/seo';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery implements OnInit, OnDestroy {
  public productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seo = inject(SeoService);
  
  private isBrowser: boolean;
  selectedCategory = signal<string>('ყველა');
  selectedImage = signal<any | null>(null);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.productService.loadProducts();
    
    this.route.params.subscribe(params => {
      const cat = params['category'] ? decodeURIComponent(params['category']) : 'ყველა';
      this.selectedCategory.set(cat);
      
      const imageMap: { [key: string]: string } = {
        'ყველა': 'main',
        'კარი': 'kari',
        'ჭიშკარი': 'chishkari',
        'მოაჯირი': 'moajiri',
        'გისოსი': 'gisosi'
      };
      
      const imgSlug = imageMap[cat] || 'main';
      
      this.seo.updateMeta({
        title: cat === 'ყველა' ? 'ჩვენი ნამუშევრები' : cat,
        description: `${cat} - უმაღლესი ხარისხის რკინის ნაკეთობების ფართო არჩევანი. დაათვალიერეთ ჩვენი გალერეა.`,
        image: `/images/og-${imgSlug}.jpg`
      });
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.doc.body.style.overflow = '';
    }
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
    const target = category === 'ყველა' ? ['/chveni-namushevrebi'] : ['/chveni-namushevrebi', category];
    this.router.navigate(target);
  }

  openImage(item: any) {
    if (this.isBrowser) {
      this.doc.body.style.overflow = 'hidden';
      this.doc.documentElement.style.overflow = 'hidden';
    }
    this.selectedImage.set(item);
  }

  closeImage() {
    if (this.isBrowser) {
      this.doc.body.style.overflow = '';
      this.doc.documentElement.style.overflow = '';
    }
    this.selectedImage.set(null);
  }
}