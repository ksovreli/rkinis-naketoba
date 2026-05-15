import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Gallery } from './gallery/gallery';
import { AboutUs } from './about-us/about-us';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { 
    path: '', 
    component: Home
  },
  { 
    path: 'chveni-namushevrebi', 
    children: [
      {
        path: '',
        component: Gallery
      },
      {
        path: ':category',
        component: Gallery
      }
    ]
  },
  {
    path: 'chvens-shesakheb',
    component: AboutUs
  },
  { 
    path: 'kontakti', 
    component: Contact
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];