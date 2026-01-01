import { Component, signal, HostListener } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  template: `
    @if (visible()) {
      <button
        (click)="scrollTop()"
        aria-label="Volver arriba"
        class="
          fixed bottom-5 right-5 z-50
          rounded-full
          bg-blue-600 text-white
          w-12 h-12 sm:w-14 sm:h-14
          flex items-center justify-center
          shadow-lg hover:bg-blue-700
          transition-all duration-300 active:scale-95
          md:bottom-8 md:right-8
        ">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
        </svg>
      </button>
    }
  `
})
export class BackToTopComponent {
  visible = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.visible.set(window.scrollY > 300);
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}