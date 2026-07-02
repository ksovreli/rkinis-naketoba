import { Injectable, signal, inject } from '@angular/core';
import { createClient } from '@sanity/client';
import imageUrlBuilder, { createImageUrlBuilder } from '@sanity/image-url';
import { Product } from '../models/product.model';

const client = createClient({
  projectId: 'rf0fs633', // აი, ეს არის სწორი კოდი
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-06-12' 
});

const builder = createImageUrlBuilder(client);

@Injectable({ providedIn: 'root' })
export class ProductService {
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);

 async loadProducts(): Promise<void> {
    if (this.products().length > 0) return;
    this.isLoading.set(true);

    try {
      // 1. მონაცემების წამოღება Sanity-დან
      const data = await client.fetch(`*[_type == "product"] | order(_createdAt asc)`);

      // 2. მონაცემების დამუშავება და დანომრვა კატეგორიების მიხედვით
      const formattedProducts: Product[] = data.map((item: any, index: number, array: any[]) => {
        // ვპოულობთ ყველა ნივთს, რომელიც იმავე კატეგორიისაა, რაც მიმდინარე
        const sameCategoryItems = array.filter(p => p.category === item.category);
        
        // ვპოულობთ მიმდინარე ნივთის პოზიციას ამ კატეგორიის სიაში
        const position = sameCategoryItems.findIndex(p => p._id === item._id) + 1;

        return {
          id: index + 1, // უნიკალური ID მთლიანი სიისთვის
          title: `${item.category} #${position}`, // ავტომატური სახელი (მაგ: გისოსი #1)
          category: item.category,
          imageUrl: item.image ? builder.image(item.image).url() : '',
          isFeatured: false
        };
      });

      // 3. შედეგის განახლება
      this.products.set(formattedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}