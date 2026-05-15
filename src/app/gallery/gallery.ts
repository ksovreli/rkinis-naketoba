import { Component, computed, inject, signal, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage, DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { SeoService } from '../services/seo';

// ─── სლაგების მეპინგი ორმხრივი კონვერტაციისთვის ───────────────────
const slugMap: { [key: string]: string } = {
  'ყველა': 'main',
  'კარი': 'kari',
  'ჭიშკარი': 'chishkari',
  'მოაჯირი': 'moajiri',
  'გისოსი': 'gisosi'
};

// შებრუნებული ობიექტი როუტიდან წამოსული ლათინური სიტყვის გასაშიფრად
const reverseSlugMap: { [key: string]: string } = {
  'main': 'ყველა',
  'kari': 'კარი',
  'chishkari': 'ჭიშკარი',
  'moajiri': 'მოაჯირი',
  'gisosi': 'გისოსი'
};

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
      const paramCat = params['category'];

      const cat = paramCat ? (reverseSlugMap[paramCat] || decodeURIComponent(paramCat)) : 'ყველა';
      this.selectedCategory.set(cat);

      const imgSlug = slugMap[cat] || 'main';

      // დინამიური და SEO-ზე ოპტიმიზირებული სათაური ბრაუზერის ტაბისთვის
      const pageTitle = cat === 'ყველა'
        ? 'ჩვენი ნამუშევრები | რკინის ნაკეთობები'
        : `${cat} | რკინის ნაკეთობები`;

      this.seo.updateMeta({
        title: pageTitle,
        description: `${cat} - უმაღლესი ხარისხის რკინის ნაკეთობების ფართო არჩევანი. დაათვალიერეთ ჩვენი გალერეა.`,
        image: `/images/og-${imgSlug}.jpg`
      });
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.doc.body.style.overflow = '';
      this.doc.documentElement.style.overflow = '';
    }
  }

  categories = computed(() => {
    const cats = this.productService.products().map(p => p.category);
    return ['ყველა', ...new Set(cats)];
  });

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const allProducts = this.productService.products();

    let result;

    if (category === 'ყველა') {
      const groups: { [key: string]: any[] } = {};
      allProducts.forEach(p => {
        if (!groups[p.category]) groups[p.category] = [];
        groups[p.category].push(p);
      });

      const catNames = Object.keys(groups);
      const mixed: any[] = [];
      let hasMore = true;
      let index = 0;

      while (hasMore) {
        hasMore = false;
        for (const cat of catNames) {
          if (groups[cat][index]) {
            mixed.push(groups[cat][index]);
            hasMore = true;
          }
        }
        index++;
      }
      result = mixed;
    } else {
      result = allProducts.filter(p => p.category === category);
    }

    const counters: { [key: string]: number } = {};
    return result.map(item => {
      counters[item.category] = (counters[item.category] || 0) + 1;
      return {
        ...item,
        customTitle: `${item.category} #${counters[item.category]}`
      };
    });
  });

  setCategory(category: string) {
    if (this.selectedCategory() === category) return;

    const slug = slugMap[category] || category;
    const target = category === 'ყველა'
      ? ['/chveni-namushevrebi']
      : ['/chveni-namushevrebi', slug];

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