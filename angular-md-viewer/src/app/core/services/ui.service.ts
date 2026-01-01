import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiService {
  // Estado del menú móvil
  mobileMenuOpen = signal(false);
  
  // Cerrar menú
  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
  
  // Toggle menú
  toggleMobileMenu() {
    this.mobileMenuOpen.update(state => !state);
  }
}