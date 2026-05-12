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
        { category: 'ჭიშკარი' },
        { category: 'მოაჯირი' },
        { category: 'კარი' },
        { category: 'გისოსი' }
      ];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];