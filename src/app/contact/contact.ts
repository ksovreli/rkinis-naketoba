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
      title: 'დაგვიკავშირდით | რკინის დიზაინი',
      description: 'გსურთ ხარისხიანი რკინის კარი, ჭიშკარი, მოაჯირი, გისოსი და სხვა? დაგვიკავშირდით ნომერზე: +995 577 32 44 19. უფასო კონსულტაცია, ზომების აღება და საუკეთესო ფასები.',
      image: 'images/chishkrebi/chishkari-1.webp'
    });
  }
}