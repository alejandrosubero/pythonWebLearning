import { Component, inject, computed, AfterViewChecked, viewChildren, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownService } from '../../../core/services/markdown.service';
import { SearchService } from '../../../core/services/search.service';

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
            <h1 [id]="b.id" [innerHTML]="b.content" class="scroll-mt-24 text-gray-900 dark:text-white"></h1>
          }
          @case (2) {
            <h2 [id]="b.id" [innerHTML]="b.content" class="scroll-mt-24 text-gray-800 dark:text-gray-100"></h2>
          }
          @case (3) {
            <h3 [id]="b.id" [innerHTML]="b.content" class="scroll-mt-24 text-gray-700 dark:text-gray-200"></h3>
          }
          @case (4) {
           <h4 [id]="b.id" [innerHTML]="b.content" class="scroll-mt-24 text-gray-600 dark:text-gray-300"></h4>
          }
          @default {
            <h5 [id]="b.id" [innerHTML]="b.content" class="scroll-mt-24 text-gray-500 dark:text-gray-400"></h5>
          }
          }
        }

        @if (b.type === 'paragraph') {
          <p [innerHTML]="b.content" class="text-gray-700 dark:text-gray-300 leading-relaxed"></p>
        }


          @if (b.type === 'code') {
            <pre class="overflow-x-auto bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded-lg text-sm"><code class="language-{{ b.language }}">{{ b.content }}</code></pre>
          }

          @if (b.type === 'table') {
            <div [innerHTML]="b.content"></div>
          }
      }
    </article>
  `
})
export class ContentRendererComponent {
  private md = inject(MarkdownService);
  private search = inject(SearchService);

  blocks = this.md.blocks;
  filteredBlocks = computed(() =>
    this.blocks().filter(b =>
      !this.search.query() ||
      b.content.toLowerCase().includes(this.search.query())
    )
  );

  // Referencias a todos los bloques de código
  private codeElements = viewChildren<ElementRef>('code');

  constructor() {
    // Efecto que solo se ejecuta cuando cambia el contenido
    effect(() => {
      const blocks = this.filteredBlocks(); // dependencia - se ejecuta cuando cambia
      const hasCodeBlocks = blocks.some(b => b.type === 'code');

      if (hasCodeBlocks && typeof window !== 'undefined' && (window as any).Prism) {
        // Espera al próximo ciclo para que Angular renderice
        setTimeout(() => {
          (window as any).Prism.highlightAll();
        }, 0);
      }
    });
  }
}

