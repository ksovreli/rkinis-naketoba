import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Gallery } from './gallery/gallery';
import { AboutUs } from './about-us/about-us';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { 
    path: '', 
    component: Home,
    title: 'მთავარი - რკინის ნაკეთობა' 
  },
  { 
    path: 'chveni-namushevrebi', 
    children: [
      {
        path: '',
        component: Gallery,
        title: 'ყველა ნამუშევარი - რკინის ნაკეთობა'
      },
      {
        path: ':category',
        component: Gallery,
        title: 'ნამუშევრები კატეგორიის მიხედვით' 
      }
    ]
  },
  {
    path: 'chvens-shesakheb',
    component: AboutUs,
    title: 'ჩვენს შესახებ - რკინის ნაკეთობა'
  },
  { 
    path: 'kontakti', 
    component: Contact,
    title: 'კონტაქტი - რკინის ნაკეთობა' 
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];