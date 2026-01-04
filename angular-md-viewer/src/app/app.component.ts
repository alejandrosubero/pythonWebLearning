
import { Component } from '@angular/core';
import { MarkdownService } from '../../src/app/core/services/markdown.service';
import { SidebarComponent } from './layout/sidebar.component';
import { ContentRendererComponent } from './features/content/content-renderer/content-renderer.component';
import { BackToTopComponent } from "./core/back/back-to-top.component";
import { NavbarComponent } from './layout/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    ContentRendererComponent,
    BackToTopComponent
  ],
  template: `
    <app-navbar />
    
    <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Sidebar -->
      <app-sidebar />
      
      <!-- Contenido Principal -->
      <main class="flex-1 md:ml-64 overflow-y-auto">
        <div class="p-4 sm:p-6">
          <app-content-renderer />
        </div>
      </main>
    </div>

    <app-back-to-top />
  `
})
export class AppComponent {
  constructor(private markdownService: MarkdownService) {
    // markdownService.loadMarkdown('assets/datos1.md');
    markdownService.loadMarkdownList();
  }
}

//ng build --configuration production

//python_Learning_web
//ng build --configuration production --base-href="/tu-repositorio/"

 // error cuando | OR | `||` | `or` | `if x or y:` |