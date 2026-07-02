import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Gallery } from './gallery/gallery';
import { AboutUs } from './about-us/about-us';
import { Contact } from './contact/contact';

export const routes: Routes = [
  // მთავარი გვერდი
  { path: '', component: Home, title: 'რკინის ნაკეთობები თბილისში | რკინის დიზაინი' },

  // ოფიციალური სლეშიანი როუტები და ახალი SEO სათაურები
  { path: 'chveni-namushevrebi/', component: Gallery, title: 'ჩვენი ნამუშევრები — კატალოგი | რკინის დიზაინი' },
  
  // 🎯 დინამიური სათაური (ფუნქციით), რომელიც ლინკის მიხედვით დასვამს სწორ Title-ს გუგლისთვის
  { 
    path: 'chveni-namushevrebi/:category/', 
    component: Gallery, 
    title: (route) => {
      const cat = route.paramMap.get('category');
      const titles: { [key: string]: string } = {
        'kari': 'რკინის კარები შეკვეთით',
        'chishkari': 'რკინის ჭიშკრები და ჭიშკრები',
        'aivnis-moajiri': 'რკინის აივნის მოაჯირები',
        'kibis-moajiri': 'რკინის კიბის მოაჯირები',
        'kibe': 'რკინის კიბეები შიდა და გარე',
        'gisosi': 'რკინის გისოსები ფანჯრებისთვის',
        'mayali': 'რკინის მაყალები'
      };
      return `${titles[cat || ''] || 'რკინის ნაკეთობები'} | რკინის დიზაინი`;
    }
  },
  
  { path: 'chvens-shesakheb/', component: AboutUs, title: 'ჩვენს შესახებ — ლითონის საამქრო | რკინის დიზაინი' },
  { path: 'kontakti/', component: Contact, title: 'კონტაქტი — ფასები და უფასო აზომვა | რკინის დიზაინი' },

  // ავტომატური გადამისამართებები უსლეშოდან სლეშიანზე
  { path: 'chvens-shesakheb', redirectTo: 'chvens-shesakheb/', pathMatch: 'full' },
  { path: 'kontakti', redirectTo: 'kontakti/', pathMatch: 'full' },
  { path: 'chveni-namushevrebi', redirectTo: 'chveni-namushevrebi/', pathMatch: 'full' },
  
  // 🎯 პარამეტრიანი რედირექტის სწორი სინტაქსი Angular-ში:
  { 
    path: 'chveni-namushevrebi/:category', 
    redirectTo: (url) => {
      return `chveni-namushevrebi/${url.params['category']}/`;
    }, 
    pathMatch: 'full' 
  },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];