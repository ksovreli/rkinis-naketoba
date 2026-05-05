import { Component, inject } from '@angular/core';
import { SeoService } from '../services/seo';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private seo = inject(SeoService);

  nngOnInit() {
    this.seo.updateMeta({
      title: 'კონტაქტი',
      description: 'დაგვიკავშირდით ინდივიდუალური შეკვეთებისთვის. ჩვენი სახელოსნო მდებარეობს თბილისში.',
      image: 'images/chishkari1.webp'
    });
  }
}

