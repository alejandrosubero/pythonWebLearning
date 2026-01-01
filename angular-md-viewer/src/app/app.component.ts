
import { Component } from '@angular/core';
import { MarkdownService } from '../../src/app/core/services/markdown.service';
import { SidebarComponent } from './layout/sidebar.component';
import { ContentRendererComponent } from '../../src/app/features/content/content-renderer.component';
import { BackToTopComponent } from "./core/back/back-to-top.component";
// import { HeaderComponent } from './layout/header.component';
import { NavbarComponent } from './layout/navbar.component';




// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     HeaderComponent,
//     SidebarComponent,
//     ContentRendererComponent,
//     BackToTopComponent
//   ],
//   template: `
//     <app-header />

//     <div class="flex">
//       <aside class="w-64 hidden md:block border-r">
//         <app-sidebar />
//       </aside>

//       <main class="flex-1">
//         <app-content-renderer />
//       </main>
//     </div>

//     <app-back-to-top />

//   `
// })
// // export class AppComponent {}
// export class AppComponent {
//   constructor(md: MarkdownService) {
//     md.loadMarkdown('assets/datos.md');
//   }
// }

// import { Component } from '@angular/core';
// import { MarkdownService } from '@core/services/markdown.service';
// import { NavbarComponent } from '@layout/navbar.component';
// import { SidebarComponent } from '@layout/sidebar.component';
// import { ContentRendererComponent } from '@features/content/content-renderer.component';
// import { BackToTopComponent } from '@core/back/back-to-top.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     NavbarComponent,
//     SidebarComponent,
//     ContentRendererComponent,
//     BackToTopComponent
//   ],
//   template: `
//    <app-navbar />

//   <div class="flex min-h-screen 
//               bg-gray-50 dark:bg-gray-900 
//               text-gray-900 dark:text-gray-100">
//     <!-- Sidebar -->
//     <aside class="w-64 hidden md:block 
//                   border-r border-gray-200 dark:border-gray-700 
//                   bg-white dark:bg-gray-800">
//       <app-sidebar />
//     </aside>

//     <!-- Contenido Principal -->
//     <main class="flex-1 overflow-y-auto">
//       <app-content-renderer />
//     </main>
//   </div>

//   <app-back-to-top />
//   `
// })
// export class AppComponent {
//   constructor(md: MarkdownService) {
//     md.loadMarkdown('assets/datos.md');
//   }
// }



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
  constructor(md: MarkdownService) {
    md.loadMarkdown('assets/datos.md');
  }
}