import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformServer } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private request = inject('REQUEST' as any, { optional: true }) as any;

  updateMeta(config: { title: string; description: string; image?: string }) {
    const fullTitle = `${config.title} | რკინის ნაკეთობები`;
    
    let baseUrl = '';
    let currentUrl = '';

    if (isPlatformServer(this.platformId)) {
      if (this.request) {
        const protocol = this.request.protocol || 'https';
        const host = this.request.get ? this.request.get('host') : this.request.headers?.host;
        baseUrl = `${protocol}://${host}`;
        currentUrl = `${baseUrl}${this.request.url || ''}`;
      } else {
        baseUrl = 'http://localhost:4200';
        currentUrl = baseUrl;
      }
    } else {
      baseUrl = this.document.location?.origin || '';
      currentUrl = this.document.URL || '';
    }

    const imageUrl = config.image 
      ? (config.image.startsWith('http') ? config.image : `${baseUrl}/${config.image}`)
      : `${baseUrl}/images/og-main.jpg`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: config.description });
    
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:url', content: currentUrl });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
  }
}