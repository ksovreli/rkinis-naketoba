import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'chveni-namushevrebi',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'chveni-namushevrebi/:category',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { category: 'chishkari' },
        { category: 'moajiri' },
        { category: 'kari' },
        { category: 'gisosi' }
      ];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];