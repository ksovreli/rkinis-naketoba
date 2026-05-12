import { Component, Inject, PLATFORM_ID, signal, NgZone, OnInit, OnDestroy, DOCUMENT } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit, OnDestroy {
  isMenuOpen = signal(false);
  isScrolled = signal(false);
  isBrowser: boolean;
  private scrollSub?: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc: Document,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        this.scrollSub = fromEvent(window, 'scroll')
          .pipe(
            throttleTime(20),
            map(() => window.scrollY > 50)
          )
          .subscribe((scrolled) => {
            if (this.isScrolled() !== scrolled) {
              this.ngZone.run(() => {
                this.isScrolled.set(scrolled);
              });
            }
          });
      });
    }
  }

  ngOnDestroy() {
    this.scrollSub?.unsubscribe();
  }

  toggleMenu() {
    const nextState = !this.isMenuOpen();
    this.isMenuOpen.set(nextState);

    if (this.isBrowser) {
      this.doc.body.style.overflow = nextState ? 'hidden' : '';
    }
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    if (this.isBrowser) {
      this.doc.body.style.overflow = '';
    }
  }
}