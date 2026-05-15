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
      title: 'დაგვიკავშირდით | rkinissaamqro.ge | რკინის საამქრო',
      description: 'გსურთ ხარისხიანი რკინის კარი, ჭიშკარი მოაჯირი ან გისოსი? დაგვიკავშირდით ნომერზე: +995 558 92 96 93. უფასო კონსულტაცია, ზომების აღება და საუკეთესო ფასები.',
      image: 'images/chishkari1.webp'
    });
  }
}