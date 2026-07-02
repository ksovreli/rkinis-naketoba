import { Component, computed, inject, signal, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage, DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { SeoService } from '../services/seo';
import { Product } from '../models/product.model';

const slugMap: { [key: string]: string } = {
  'ყველა': 'main',
  'კარი': 'kari',
  'ჭიშკარი': 'chishkari',
  'აივნის მოაჯირი': 'aivnis-moajiri',
  'კიბის მოაჯირი': 'kibis-moajiri',
  'კიბე': 'kibe',
  'მაყალი': 'mayali',
  'გისოსი': 'gisosi'
};

const reverseSlugMap: { [key: string]: string } = Object.fromEntries(
  Object.entries(slugMap).map(([k, v]) => [v, k])
);

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterModule],
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
  searchQuery = signal('');

  private readonly categorySearchAliases: Record<string, string[]> = {
    'კარი': ['კარი', 'kari', 'kar', 'რკინის კარი'],
    'ჭიშკარი': ['ჭიშკარი', 'chishkari', 'chishk', 'ჭიშკ'],
    'აივნის მოაჯირი': ['აივნის მოაჯირი', 'aivnis', 'aivnis-moajiri', 'aivnis moajiri', 'moajiri'],
    'კიბის მოაჯირი': ['კიბის მოაჯირი', 'kibis', 'kibis-moajiri', 'kibi'],
    'კიბე': ['კიბე', 'kibe'],
    'მაყალი': ['მაყალი', 'mayali', 'mayalebi'],
    'გისოსი': ['გისოსი', 'gisosi', 'gisosebi']
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.productService.loadProducts();

    this.route.params.subscribe(params => {
      let paramCat = params['category'];

      if (!paramCat) {
        this.selectedCategory.set('ყველა');
        this.updateSEO('ყველა');
        return;
      }

      // 🎯 ვასუფთავებთ სლეშებისგან შიდა სელექტორისთვის
      paramCat = paramCat.replace(/\//g, '');

      if (reverseSlugMap[paramCat]) {
        this.selectedCategory.set(reverseSlugMap[paramCat]);
        this.updateSEO(reverseSlugMap[paramCat]);
      } else {
        const decodedCat = decodeURIComponent(paramCat);
        const correctSlug = slugMap[decodedCat];

        if (correctSlug) {
          // 🎯 რედირექტი სუფთა სტრინგზე ბოლოში სლეშით
          this.router.navigateByUrl(`/chveni-namushevrebi/${correctSlug}/`, { replaceUrl: true });
        } else {
          this.router.navigateByUrl('/chveni-namushevrebi/', { replaceUrl: true });
        }
      }
    });
  }

  getSlug(category: string): string {
    return slugMap[category] || category;
  }

  // 🎯 მხოლოდ ძებნას ვასუფთავებთ, ნავიგაციას HTML-ის სტრინგ-ლინკი აკეთებს თავისით
  resetSearchOnly() {
    this.searchQuery.set('');
  }

  private updateSEO(cat: string) {
    const imgSlug = slugMap[cat] || 'main';

    // 🎯 ხალხი გუგლში ეძებს "რკინის კარები"-ს და არა "კარები"-ს. 
    // ამიტომ ბრენდირებულ სიტყვებს პირდაპირ აქ ვსვამთ ოპტიმიზაციისთვის.
    const seoNameMap: { [key: string]: string } = {
      'კარი': 'რკინის კარები',
      'ჭიშკარი': 'რკინის ჭიშკრები',
      'აივნის მოაჯირი': 'რკინის აივნის მოაჯირები',
      'კიბის მოაჯირი': 'რკინის კიბის მოაჯირები',
      'კიბე': 'რკინის კიბეები',
      'მაყალი': 'რკინის მაყალები',
      'გისოსი': 'რკინის გისოსები'
    };

    const currentPlural = seoNameMap[cat] || cat;

    // 🎯 სათაურის (Title) ფორმირება კონკრეტული საკვანძო სიტყვით
    const pageTitle = cat === 'ყველა'
      ? 'რკინის ნაკეთობები - ჩვენი ნამუშევრები' // სერვისი თავისით მიაწერს | rkinisdizaini.ge
      : `${currentPlural} შეკვეთით`;

    // 🎯 აღწერის (Description) ფორმირება, რომელიც გუგლში საიტის ქვეშ გამოჩნდება
    const pageDesc = cat === 'ყველა'
      ? 'იხილეთ ჩვენი ნამუშევრები: უმაღლესი ხარისხის რკინის კარები, ჭიშკრები, მოაჯირები, კიბეები, გისოსები და მაყალები შეკვეთით 20 წლის გამოცდილებით.'
      : `პრემიუმ ხარისხის ${currentPlural} თბილისში ინდივიდუალური დიზაინით, საუკეთესო მასალითა და გარანტიით. დაათვალიერეთ ფოტო გალერეა.`;

    this.seo.updateMeta({
      title: pageTitle,
      description: pageDesc,
      image: `chishkrebi/chishkari-1.webp`
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.doc.body.style.overflow = '';
      this.doc.documentElement.style.overflow = '';
    }
  }

  categories = computed(() => {
    const products = this.productService.products();
    const cats = Array.isArray(products) ? products.map(p => p.category) : [];
    return ['ყველა', ...new Set(cats)];
  });

  selectedCategoryPlural = computed(() => {
    const cat = this.selectedCategory();
    const pluralMap: { [key: string]: string } = {
      'კარი': 'კარები',
      'ჭიშკარი': 'ჭიშკრები',
      'აივნის მოაჯირი': 'აივნის მოაჯირები',
      'კიბის მოაჯირი': 'კიბის მოაჯირები',
      'კიბე': 'კიბეები',
      'მაყალი': 'მაყალები',
      'გისოსი': 'გისოსები'
    };
    return pluralMap[cat] || cat;
  });

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const allProducts = this.productService.products();

    if (!Array.isArray(allProducts)) return [];

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
      const displayNumber = counters[item.category];
      return {
        ...item,
        displayNumber,
        customTitle: `${item.category} #${displayNumber}`
      };
    }).filter(item => this.matchesSearch(item, this.searchQuery()));
  });

  hasActiveSearch = computed(() => this.searchQuery().trim().length > 0);

  onSearchChange(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  private normalizeForSearch(text: string): string {
    return text.trim().toLowerCase().replace(/\s+/g, ' ');
  }

  private queryMatchesCategory(query: string, category: string): boolean {
    const normalizedCategory = category.toLowerCase();
    if (query.includes(normalizedCategory)) {
      return true;
    }

    const slug = slugMap[category]?.toLowerCase();
    if (slug && query.includes(slug)) {
      return true;
    }

    return (this.categorySearchAliases[category] ?? []).some(alias => query.includes(alias.toLowerCase()));
  }

  private extractQueryNumber(query: string): number | null {
    const match = query.match(/(?:№|#)?(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }

  private matchesSearch(item: Product & { customTitle?: string; displayNumber?: number }, query: string): boolean {
    const q = this.normalizeForSearch(query);
    if (!q) {
      return true;
    }

    const displayNumber = item.displayNumber ?? 0;
    const customTitle = (item.customTitle ?? '').toLowerCase();
    const title = (item.title ?? '').toLowerCase();
    const categoryLower = item.category.toLowerCase();
    const queryNumber = this.extractQueryNumber(q);
    const compactQuery = q.replace(/\s+/g, '');

    if (customTitle.includes(q) || title.includes(q) || categoryLower.includes(q)) {
      return true;
    }

    if (queryNumber !== null && displayNumber === queryNumber) {
      const isNumberOnly = /^(?:№|#)?\d+$/.test(compactQuery);
      if (isNumberOnly) {
        return true;
      }

      if (this.queryMatchesCategory(q, item.category)) {
        return true;
      }

      const slug = slugMap[item.category]?.toLowerCase();
      if (slug && (q.includes(`${slug} ${queryNumber}`) || q.includes(`${slug}-${queryNumber}`) || q.includes(`${slug}${queryNumber}`))) {
        return true;
      }
    }

    return false;
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