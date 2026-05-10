import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../services/seo';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.updateMeta({
      title: 'კონტაქტი',
      description: 'დაგვიკავშირდით ინდივიდუალური შეკვეთებისთვის. ჩვენი სახელოსნო მდებარეობს თბილისში.',
      image: 'images/chishkari1.webp'
    });
  }
}