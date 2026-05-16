import { Component, inject, computed, PLATFORM_ID, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { ProductService } from '../services/product.service';
import { SeoService } from '../services/seo';

export type Category = 'ჭიშკარი' | 'მოაჯირი' | 'კარი' | 'გისოსი';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private seo = inject(SeoService);
  public productService = inject(ProductService);
  
  categories: Category[] = ['ჭიშკარი', 'მოაჯირი', 'კარი', 'გისოსი'];

  

  ngOnInit() {
    this.productService.loadProducts();
    
    this.seo.updateMeta({
      title: 'rkinissaamqro.ge | რკინის ნაკეთობები | რკინის საამქრო',
      description: 'უმაღლესი ხარისხის რკინის ნაკეთობების დამზადება 20 წლიანი გამოცდილებით. ჭიშკრები, კარები, მოაჯირები და გისოსები ინდივიდუალური დიზაინითა და გარანტიით!',
      image: 'images/chishkari1.webp'
    });
  }

  categoryCards = computed(() => {
    const products = this.productService.products();
    const manualImages: Record<Category, string> = {
      'ჭიშკარი': 'images/chishkari1.webp',
      'კარი': 'images/kari1.webp',
      'მოაჯირი': 'images/moajiri4.webp',
      'გისოსი': 'images/gisosi1.webp'
    }; 

    return this.categories.map((cat, i) => {
      const found = products.find(p => p.category === cat);
      return {
        id: i + 1,
        name: cat,
        description: this.getDesc(cat),
        image: manualImages[cat] || found?.imageUrl
      };
    });
  });

  private getDesc(cat: Category): string {
    const map: Record<Category, string> = {
      ჭიშკარი: 'ექსკლუზიური დიზაინი',
      მოაჯირი: 'სიმტკიცე და სტილი',
      კარი: 'უსაფრთხოების გარანტი',
      გისოსი: 'დაცული სივრცე'
    };
    return map[cat];
  }
}