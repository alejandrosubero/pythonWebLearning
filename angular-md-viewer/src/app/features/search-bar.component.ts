import { Component, inject } from '@angular/core';
import { SearchService } from '../core/services/search.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  template: `
    <div class="relative">
      <input
        type="text"
        placeholder="Buscar..."
        class="w-full rounded-lg border px-3 py-2 text-sm
               bg-white dark:bg-gray-700
               border-gray-300 dark:border-gray-600
               text-gray-900 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-blue-500"
        [value]="search.query()"
        (input)="onInput($event)"
      />
      
      <!-- Botón limpiar -->
      @if (search.query()) {
        <button 
          (click)="search.clear()"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
          ✕
        </button>
      }
    </div>
  `
})
export class SearchBarComponent {
  search = inject(SearchService);

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.setQuery(value);
  }
}