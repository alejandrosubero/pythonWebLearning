import { Component, inject, computed, AfterViewChecked, viewChildren, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownService } from '../../../core/services/markdown.service';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-render-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './render-content.component.html',
  styleUrl: './render-content.component.css'
})
export class RenderContentComponent {
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
  
  