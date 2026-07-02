import { RenderMode, ServerRoute } from '@angular/ssr';

// 🎯 დარწმუნდი, რომ ზუსტად ეს სახელი არის ექსპორტირებული: serverRoutes
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'chvens-shesakheb/', renderMode: RenderMode.Prerender },
  { path: 'kontakti/', renderMode: RenderMode.Prerender },
  { path: 'chveni-namushevrebi/', renderMode: RenderMode.Prerender },
  
  { 
    path: 'chveni-namushevrebi/:category/', 
    renderMode: RenderMode.Prerender, 
    async getPrerenderParams() {
      return [
        { category: 'kari' }, { category: 'chishkari' }, { category: 'aivnis-moajiri' }, 
        { category: 'kibis-moajiri' }, { category: 'kibe' }, { category: 'mayali' }, { category: 'gisosi' }
      ];
    }
  },
  
  { path: '**', renderMode: RenderMode.Server }
];