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
    path: 'chveni-namushevrebi/',
    component: Gallery
  },
  {
    path: 'chveni-namushevrebi/:category/',
    component: Gallery
  },
  {
    path: 'chvens-shesakheb/',
    component: AboutUs
  },
  {
    path: 'kontakti/',
    component: Contact
  },

  { path: 'chveni-namushevrebi', redirectTo: 'chveni-namushevrebi/', pathMatch: 'full' },
  { path: 'chvens-shesakheb', redirectTo: 'chvens-shesakheb/', pathMatch: 'full' },
  { path: 'kontakti', redirectTo: 'kontakti/', pathMatch: 'full' },
  
  { path: 'chveni-namushevrebi/:category', redirectTo: 'chveni-namushevrebi/:category/', pathMatch: 'full' },

  {
    path: '**',
    component: Home
  }
];