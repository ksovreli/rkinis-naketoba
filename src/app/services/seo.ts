import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformServer } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  private readonly DOMAIN = 'https://rkinisdizaini.ge';

  updateMeta(config: { title: string; description: string; image?: string }) {
    const fullTitle = config.title.includes('rkinisdizaini.ge')
      ? config.title
      : `${config.title} | rkinisdizaini.ge`;

    const currentUrl = isPlatformServer(this.platformId)
      ? this.DOMAIN
      : this.doc.location.href;

    const defaultImage = 'chishkrebi/chishkari-1.webp';

    const imageUrl = config.image?.startsWith('http')
      ? config.image
      : `${this.DOMAIN}/${config.image || defaultImage}`;

    // სათაურის განახლება
    this.title.setTitle(fullTitle);

    const tags = [
      { name: 'description', content: config.description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: config.description },
      { property: 'og:image', content: imageUrl },
      { property: 'og:url', content: currentUrl },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' }
    ];

    tags.forEach(tag => {
      if (tag.name) this.meta.updateTag({ name: tag.name, content: tag.content });
      if (tag.property) this.meta.updateTag({ property: tag.property, content: tag.content });
    });

    this.updateCanonicalLink(currentUrl);
  }

  private updateCanonicalLink(url: string) {
    let link: HTMLLinkElement | null = this.doc.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}