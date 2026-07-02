import { Component, inject, computed, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService } from '../services/product.service';
import { SeoService } from '../services/seo';

export type Category = 'ჭიშკარი' | 'აივნის მოაჯირი' | 'კარი' | 'კიბის მოაჯირი' | 'კიბე' | 'მაყალი' | 'გისოსი';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private seo = inject(SeoService);
  public productService = inject(ProductService);

  readonly categories: Category[] = [
    'ჭიშკარი',
    'აივნის მოაჯირი',
    'კარი',
    'გისოსი',
    'კიბის მოაჯირი',
    'კიბე',
    'მაყალი'
  ];

  ngOnInit() {
    this.productService.loadProducts();

    this.seo.updateMeta({
      title: 'თანამედროვე რკინის ნაკეთობები | rkinisdizaini.ge',
      description: 'უმაღლესი ხარისხის რკინის ნაკეთობების დამზადება 20 წლიანი გამოცდილებით. მდიდრული დიზაინის ჭიშკრები, კარები, მოაჯირები და გისოსები გარანტიით.',
      image: 'images/chishkrebi/chishkari-1.webp'
    });
  }

  // კატეგორიის სახელის გადაყვანა URL სლაგად
  getSlug(category: string): string {
    const map: Record<string, string> = {
      'კარი': 'kari',
      'ჭიშკარი': 'chishkari',
      'აივნის მოაჯირი': 'aivnis-moajiri',
      'კიბის მოაჯირი': 'kibis-moajiri',
      'კიბე': 'kibe',
      'მაყალი': 'mayali',
      'გისოსი': 'gisosi'
    };
    return map[category] || 'main';
  }

  categoryCards = computed(() => {
    const products = this.productService.products();

    const manualImages: Record<string, string> = {
      'ჭიშკარი': 'images/chishkrebi/chishkari-23.webp',
      'კარი': 'images/karebi/kari-1.webp',
      'გისოსი': 'images/gisosebi/gisosi-18.webp',
      'აივნის მოაჯირი': 'images/aivnis-moajireebi/aivnis-moajiri-1.webp',
      'კიბის მოაჯირი': 'images/moajirebi/moajiri-1.webp',
      'კიბე': 'images/kibeebi/kibe-1.webp',
      'მაყალი': 'images/mayalebi/mayali-2.webp'
    };

    return this.categories.map((cat, i) => {
      const found = products.find(p => p.category === cat);
      return {
        id: i + 1,
        name: cat,
        slug: this.getSlug(cat), // დავამატეთ slug ბარათისთვის
        description: this.getDesc(cat),
        image: manualImages[cat] || found?.imageUrl
      };
    });
  });

  private getDesc(cat: Category): string {
    const map: Record<Category, string> = {
      'ჭიშკარი': 'ექსკლუზიური დიზაინი',
      'აივნის მოაჯირი': 'სიმტკიცე და სტილი',
      'კარი': 'უსაფრთხოების გარანტი',
      'გისოსი': 'საუკეთესო დამცავი ხარისხი',
      'კიბის მოაჯირი': 'დახვეწილი დეტალები',
      'კიბე': 'თანამედროვე კონსტრუქციები',
      'მაყალი': 'საუკეთესო ხარისხი'
    };
    return map[cat];
  }
}