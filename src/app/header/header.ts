import { Component, Inject, PLATFORM_ID, signal, NgZone, OnInit, OnDestroy } from '@angular/core';
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
export class Header{
  isMenuOpen = signal(false);
  isScrolled = signal(false);
  isBrowser: boolean;
  private scrollSub?: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone // ვიყენებთ NgZone-ს
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
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}