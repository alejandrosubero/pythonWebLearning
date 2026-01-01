// import { Component, inject, computed } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MarkdownService } from '../../../../src/app/core/services/markdown.service';
// import { SearchService } from '../../../../src/app/core/services/search.service';

// @Component({
//   selector: 'app-content-renderer',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//   <article class="prose max-w-none p-4">
//     @for (b of filteredBlocks(); track b.id) {

//       @if (b.type === 'heading') {
//         @switch (b.level) {
//           @case (1) {
//             <h1 [id]="b.id" class="scroll-mt-24">{{ b.content }}</h1>
//           }
//           @case (2) {
//             <h2 [id]="b.id" class="scroll-mt-24">{{ b.content }}</h2>
//           }
//           @case (3) {
//             <h3 [id]="b.id" class="scroll-mt-24">{{ b.content }}</h3>
//           }
//           @case (4) {
//             <h4 [id]="b.id" class="scroll-mt-24">{{ b.content }}</h4>
//           }
//           @default {
//             <h5 [id]="b.id" class="scroll-mt-24">{{ b.content }}</h5>
//           }
//         }
//       }

//       @if (b.type === 'paragraph') {
//         <p>{{ b.content }}</p>
//       }

//       @if (b.type === 'code') {
//         <pre class="overflow-x-auto bg-slate-900 text-slate-100 p-4 rounded-xl text-sm">
//         <code>{{ b.content }}</code>
//         </pre>
//       }

//     }
//   </article>
//   `
// })
// export class ContentRendererComponent {

//   private md = inject(MarkdownService);
//   private search = inject(SearchService);

//   /** Señal original */
//   blocks = this.md.blocks;

//   /** 🔍 Señal filtrada */
//   filteredBlocks = computed(() =>
//     this.blocks().filter(b =>
//       !this.search.query() ||
//       b.content.toLowerCase().includes(this.search.query())
//     )
//   );
// }



import { Component, inject, computed, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownService } from '../../../../src/app/core/services/markdown.service';
import { SearchService } from '../../../../src/app/core/services/search.service';

@Component({
  selector: 'app-content-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="prose prose-slate dark:prose-invert max-w-none p-6 
                   bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-gray-100 
                   min-h-screen">
      @for (b of filteredBlocks(); track b.id) {
        @if (b.type === 'heading') {
          @switch (b.level) {
            @case (1) {
              <h1 [id]="b.id" class="scroll-mt-24 text-gray-900 dark:text-white">
                {{ b.content }}
              </h1>
            }
            @case (2) {
              <h2 [id]="b.id" class="scroll-mt-24 text-gray-800 dark:text-gray-100">
                {{ b.content }}
              </h2>
            }
            @case (3) {
              <h3 [id]="b.id" class="scroll-mt-24 text-gray-700 dark:text-gray-200">
                {{ b.content }}
              </h3>
            }
            @case (4) {
              <h4 [id]="b.id" class="scroll-mt-24 text-gray-600 dark:text-gray-300">
                {{ b.content }}
              </h4>
            }
            @default {
              <h5 [id]="b.id" class="scroll-mt-24 text-gray-500 dark:text-gray-400">
                {{ b.content }}
              </h5>
            }
          }
        }

        @if (b.type === 'paragraph') {
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            {{ b.content }}
          </p>
        }

        @if (b.type === 'code') {
          <pre class="overflow-x-auto bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded-lg text-sm">
            <code>{{ b.content }}</code>
          </pre>
        }
      }
    </article>
  `
})
export class ContentRendererComponent implements AfterViewChecked {
  private md = inject(MarkdownService);
  private search = inject(SearchService);

  blocks = this.md.blocks;
  
  filteredBlocks = computed(() =>
    this.blocks().filter(b =>
      !this.search.query() ||
      b.content.toLowerCase().includes(this.search.query())
    )
  );

  ngAfterViewChecked() {
    // Aquí iría Prism.highlightAll() si implementas syntax highlighting
  }
}

// import { Component, inject, computed } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MarkdownService } from '../../../../src/app/core/services/markdown.service';
// import { SearchService } from '../../../../src/app/core/services/search.service';

// @Component({
//   selector: 'app-content-renderer',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <article class="prose prose-slate dark:prose-invert max-w-none p-6 
//                    bg-white dark:bg-gray-800 
//                    text-gray-900 dark:text-gray-100 
//                    min-h-screen">
//       <!-- Debug: mostrar conteo de resultados -->
//       @if (search.query()) {
//         <div class="mb-4 p-2 bg-blue-50 dark:bg-blue-900 text-sm rounded">
//           Encontrados: {{ filteredBlocks().length }} de {{ md.blocks().length }} resultados
//         </div>
//       }

//       @for (b of filteredBlocks(); track b.id) {
//         <!-- ... tu template existente ... -->
//         @if (b.type === 'heading') {
//           @switch (b.level) {
//             @case (1) { <h1 [id]="b.id" class="scroll-mt-24">{{ b.content }}</h1> }
//             @case (2) { <h2 [id]="b.id" class="scroll-mt-24">{{ b.content }}</h2> }
//             @case (3) { <h3 [id]="b.id" class="scroll-mt-24">{{ b.content }}</h3> }
//             @case (4) { <h4 [id]="b.id" class="scroll-mt-24">{{ b.content }}</h4> }
//             @default { <h5 [id]="b.id" class="scroll-mt-24">{{ b.content }}</h5> }
//           }
//         }
//         @if (b.type === 'paragraph') { <p>{{ b.content }}</p> }
//         @if (b.type === 'code') {
//           <pre class="overflow-x-auto bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded-lg text-sm">
//             <code>{{ b.content }}</code>
//           </pre>
//         }
//       }
//     </article>
//   `
// })
// export class ContentRendererComponent {
//   md = inject(MarkdownService);
//   search = inject(SearchService);

//   // ✅ CORREGIDO: Trabaja SIEMPRE con la fuente original
//   filteredBlocks = computed(() => {
//     const query = this.search.query().toLowerCase().trim();
//     const allBlocks = this.md.blocks(); // Fuente original SIEMPRE
    
//     if (!query) {
//       return allBlocks; // Devuelve todos si no hay búsqueda
//     }
    
//     return allBlocks.filter(b => 
//       b.content.toLowerCase().includes(query)
//     );
//   });
// }