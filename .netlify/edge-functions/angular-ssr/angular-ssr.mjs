
  import "./polyfill.mjs";
  
    import { netlifyAppEngineHandler } from "../../../dist/rkinis-naketoba/server/server.mjs";
    import "./fixup-event.mjs";

    export default netlifyAppEngineHandler;
    
  export const config = {
    path: "/*",
    excludedPath: ["/.netlify/*","/android-chrome-192x192.png","/android-chrome-512x512.png","/apple-touch-icon.png","/data/products.json","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/images/chishkari1.webp","/images/chishkari10.webp","/images/chishkari2.jpg","/images/chishkari2.webp","/images/chishkari3.webp","/images/chishkari4.webp","/images/chishkari5.webp","/images/chishkari6.webp","/images/chishkari7.webp","/images/chishkari8.webp","/images/chishkari9.webp","/images/gisosi1.webp","/images/gisosi2.webp","/images/gisosi3.webp","/images/gisosi4.webp","/images/gisosi5.webp","/images/gisosi6.webp","/images/gisosi7.webp","/images/gisosi8.webp","/images/iron-forge-about.webp","/images/kari1.webp","/images/kari10.webp","/images/kari11.webp","/images/kari12.webp","/images/kari13.webp","/images/kari14.webp","/images/kari15.webp","/images/kari16.webp","/images/kari17.webp","/images/kari18.webp","/images/kari19.webp","/images/kari2.webp","/images/kari20.webp","/images/kari21.webp","/images/kari3.webp","/images/kari4.webp","/images/kari5.webp","/images/kari6.webp","/images/kari7.webp","/images/kari8.webp","/images/kari9.webp","/images/moajiri1.webp","/images/moajiri10.webp","/images/moajiri11.webp","/images/moajiri2.webp","/images/moajiri3.webp","/images/moajiri4.webp","/images/moajiri5.webp","/images/moajiri6.webp","/images/moajiri7.webp","/images/moajiri8.webp","/images/moajiri9.webp","/index.csr.html","/index.html","/main-ZLHSCM7Z.js","/site.webmanifest","/styles-SPHVR76V.css","/კონტაქტი/index.html","/ჩვენი-ნამუშევრები/index.html","/ჩვენი-ნამუშევრები/გისოსი/index.html","/ჩვენი-ნამუშევრები/კარი/index.html","/ჩვენი-ნამუშევრები/მოაჯირი/index.html","/ჩვენი-ნამუშევრები/ჭიშკარი/index.html","/ჩვენს-შესახებ/index.html","/","/კონტაქტი","/ჩვენი-ნამუშევრები","/ჩვენი-ნამუშევრები/გისოსი","/ჩვენი-ნამუშევრები/კარი","/ჩვენი-ნამუშევრები/მოაჯირი","/ჩვენი-ნამუშევრები/ჭიშკარი","/ჩვენს-შესახებ"],
    generator: "@netlify/angular-runtime@3.0.1",
    name: "Angular SSR",
    cache: "manual",
  };
  