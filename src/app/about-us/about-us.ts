import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../services/seo';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.updateMeta({
      title: 'ჩვენს შესახებ | რკინის დიზაინი',
      description: 'გაიცანით ჩვენი გუნდი. ვქმნით ნებისმიერი სირთულის რკინის ნაკეთობებს 20 წლიანი გამოცდილებით, დახვეწილი ესთეტიკითა და სრული გარანტიით.',
      image: 'images/chishkrebi/chishkari-1.webp'
    });
  }
}