import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SeoService } from '../services/seo';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.updateMeta({
      title: 'ჩვენს შესახებ | rkinissaamqro.ge | რკინის საამქრო',
      description: 'გაიცანით ჩვენი გუნდი. რკინის საამქრო გთავაზობთ ნებისმიერი სირთულის რკინის ნაკეთობების დამზადებას მრავალწლიანი გამოცდილებით, უახლესი ტექნოლოგიებითა და სრული გარანტიით.',
      image: 'images/chishkari1.webp'
    });
  }
}
