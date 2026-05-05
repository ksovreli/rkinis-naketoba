import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  // ვიყენებთ signals-ს უკეთესი პერფორმანსისთვის
  isMenuOpen = signal(false);
  isScrolled = signal(false);
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // ვამოწმებთ, გაშვებულია თუ არა კოდი ბრაუზერში
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // კრიტიკული ფაქტორი: window-ს ვიყენებთ მხოლოდ ბრაუზერში
    if (this.isBrowser) {
      this.isScrolled.set(window.scrollY > 50);
    }
  }
}