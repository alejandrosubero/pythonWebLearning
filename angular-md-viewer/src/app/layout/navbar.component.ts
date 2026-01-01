// import { Component, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { SearchBarComponent } from './search-bar.component';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [SearchBarComponent],
//   template: `
//     <nav class="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
//       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div class="flex justify-between items-center h-16">
//           <!-- Logo/Título -->
//           <div class="flex items-center">
//             <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
//               Markdown Viewer
//             </h1>
//           </div>

//           <!-- Búsqueda (visible en desktop) -->
//           <div class="hidden md:flex flex-1 max-w-md mx-8">
//             <app-search-bar />
//           </div>

//           <!-- Controles -->
//           <div class="flex items-center space-x-4">
//             <!-- Toggle Tema -->
//             <button
//               (click)="toggleTheme()"
//               class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//               aria-label="Cambiar tema"
//             >
//               @if (isDark()) {
//                 <!-- Icono Sol (modo oscuro activo) -->
//                 <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
//                 </svg>
//               } @else {
//                 <!-- Icono Luna (modo claro activo) -->
//                 <svg class="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//                 </svg>
//               }
//             </button>
//           </div>
//         </div>
//       </div>

      
//     </nav>
//   `
// })
// export class NavbarComponent {
//   isDark = signal(false);

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
//     // Efecto para aplicar la clase 'dark' al <html>
//     effect(() => {
//       if (isPlatformBrowser(this.platformId)) {
//         const html = document.documentElement;
//         if (this.isDark()) {
//           html.classList.add('dark'); // ✅ CORREGIDO
//         } else {
//           html.classList.remove('dark'); // ✅ CORREGIDO
//         }
//         localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
//       }
//     });

//     // Leer tema guardado al iniciar
//     if (isPlatformBrowser(this.platformId)) {
//       const saved = localStorage.getItem('theme');
//       this.isDark.set(saved === 'dark');
//     }
//   }

//   toggleTheme() {
//     this.isDark.update(v => !v);
//   }
// }


import { Component, signal, effect, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';
import { UiService } from '../core/services/ui.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchBarComponent],
  template: `
    <nav class="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          
          <!-- Lado izquierdo: Logo + Menú Hamburguesa -->
          <div class="flex items-center space-x-4">
            <!-- Botón Hamburguesa (SOLO MÓVIL) -->
            <button
              (click)="ui.toggleMobileMenu()"
              class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Abrir menú"
            >
              <svg class="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            <!-- Logo -->
            <h1 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              Markdown Viewer
            </h1>
          </div>

          <!-- Búsqueda (VISIBLE EN TABLET Y DESKTOP) -->
          <div class="hidden md:flex flex-1 max-w-md mx-8">
            <app-search-bar />
          </div>

          <!-- Controles: Toggle Tema -->
          <div class="flex items-center space-x-2">
            <button
              (click)="toggleTheme()"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Cambiar tema"
            >
              <!-- ... (tu código de iconos de tema sigue igual) ... -->
              @if (isDark()) {
                <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">...</svg>
              } @else {
                <svg class="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">...</svg>
              }
            </button>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  isDark = signal(false);
  ui = inject(UiService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const html = document.documentElement;
        this.isDark() ? html.classList.add('dark') : html.classList.remove('dark');
        localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme');
      this.isDark.set(saved === 'dark');
    }
  }

  toggleTheme() {
    this.isDark.update(v => !v);
  }
}