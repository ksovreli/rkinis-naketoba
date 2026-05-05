import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  updateMeta(config: { title: string; description: string; image?: string }) {
    const fullTitle = `${config.title} | რკინის ნაკეთობები`;
    const baseUrl = this.document.location.origin;
    
    const imageUrl = config.image 
      ? (config.image.startsWith('http') ? config.image : `${baseUrl}/${config.image}`)
      : `${baseUrl}/images/og-main.jpg`;

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: config.description });
    
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:url', content: this.document.URL });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
  }
}