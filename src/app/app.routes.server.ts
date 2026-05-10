import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // დედა როუტი
  {
    path: 'ჩვენი-ნამუშევრები',
    renderMode: RenderMode.Prerender
  },
  // შვილობილი (კატეგორიების) როუტი
  {
    path: 'ჩვენი-ნამუშევრები/:category',
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
  // ყველა სხვა დანარჩენი გვერდი
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];