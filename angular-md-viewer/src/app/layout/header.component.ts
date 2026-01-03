import { Component } from '@angular/core';
import { SearchBarComponent } from '../features/search-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent],
  template: `
    <header class="sticky top-0 z-40 
                   bg-white dark:bg-gray-900 
                   border-b border-gray-200 dark:border-gray-700 p-3 md:hidden">
      <app-search-bar />
    </header>
  `
})
export class HeaderComponent {}