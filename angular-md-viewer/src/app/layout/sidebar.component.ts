import { Component, inject, computed } from '@angular/core';
import { MarkdownService } from '../core/services/markdown.service';
import { SearchService } from '../core/services/search.service';
import { UiService } from '../core/services/ui.service';
import { SearchBarComponent } from '../features/search-bar.component';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SearchBarComponent],
  template: `
    <!-- BACKDROP -->
    @if (ui.mobileMenuOpen()) {
      <div (click)="ui.closeMobileMenu()" class="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"></div>
    }

    <!-- SIDEBAR -->
    <aside 
      class="fixed md:relative top-0 left-0 h-full w-64 max-w-full 
             bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
             transform transition-transform duration-300 ease-in-out z-50 md:z-auto
             -translate-x-full md:translate-x-0 pt-16 md:pt-0
             overflow-y-auto"
      [class.translate-x-0]="ui.mobileMenuOpen()"
      [class.-translate-x-full]="!ui.mobileMenuOpen()">
      
      <!-- Búsqueda móvil -->
      @if (ui.mobileMenuOpen()) {
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
          <app-search-bar />
        </div>
      }

      <!-- LISTA DE HEADINGS -->
      <nav class="p-4 space-y-3">
        @for (h of filteredHeadings(); track h.id) {
          <a [href]="'#' + h.id" (click)="ui.closeMobileMenu()"
             class="block text-sm py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                    text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            {{ h.content }}
          </a>
        }
        
        <!-- ✅ CORREGIDO: search es ahora público -->
        @if (filteredHeadings().length === 0 && search.query()) {
          <p class="text-xs text-gray-500 dark:text-gray-400 p-3">
            No se encontraron coincidencias para "{{ search.query() }}"
          </p>
        }
      </nav>
    </aside>
  `
})
export class SidebarComponent {
  // ✅ CORREGIDO: Removido 'private' para que sea público
  md = inject(MarkdownService);
  search = inject(SearchService);
  ui = inject(UiService);

  filteredHeadings = computed(() => {
    const query = this.search.query().toLowerCase().trim();
    const allHeadings = this.md.headings();
    
    if (!query) {
      return allHeadings;
    }
    
    return allHeadings.filter(h => 
      h.content.toLowerCase().includes(query)
    );
  });
}