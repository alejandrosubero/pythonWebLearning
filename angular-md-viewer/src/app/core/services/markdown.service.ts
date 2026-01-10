import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { MarkdownBlock } from '../models/markdown.model';

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  blocks = signal<MarkdownBlock[]>([]);
  headings = signal<MarkdownBlock[]>([]);

  constructor(private http: HttpClient) { }


  /**
   * Divide una línea de tabla por pipes (|), pero ignora los pipes que están 
   * dentro de acentos graves (code spans).
   */
  private splitTableLine(line: string): string[] {
    const cells: string[] = [];
    let currentCell = '';
    let inCode = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '`') {
        inCode = !inCode;
        currentCell += char;
      } else if (char === '|' && !inCode) {
        cells.push(currentCell);
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    cells.push(currentCell);
    return cells;
  }

  private parseTable(rows: string[]): string {
    const filteredRows = rows.filter(r => !r.match(/^\|?\s?[:-]+\s?\|/));
    
    let html = '<div class="overflow-x-auto my-6 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">';
    html += '<table class="w-full text-sm text-left border-collapse">';
    
    filteredRows.forEach((row, index) => {
      // Usamos nuestra nueva función de división inteligente
      let cells = this.splitTableLine(row.trim());

      // Limpieza de celdas vacías en los extremos causadas por los pipes laterales
      if (cells[0].trim() === '') cells.shift();
      if (cells.length > 0 && cells[cells.length - 1].trim() === '') cells.pop();

      const isHeader = index === 0;
      const tag = isHeader ? 'th' : 'td';
      const rowClass = isHeader 
        ? 'bg-gray-100 dark:bg-gray-700/50 text-gray-900 dark:text-white font-bold' 
        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800';

      html += `<tr class="${rowClass}">`;
      cells.forEach(cell => {
        const content = this.parseInlineStyles(cell.trim());
        html += `<${tag} class="p-3 border-r last:border-r-0 border-gray-200 dark:border-gray-700">${content}</${tag}>`;
      });
      html += '</tr>';
    });

    html += '</table></div>';
    return html;
  }

  private parseInlineStyles(text: string): string {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-blue-600 dark:text-blue-400">$1</strong>')
      // Regex mejorada para código inline (Rojo)
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-red-600 dark:text-red-400 border border-gray-200 dark:border-gray-700">$1</code>');
  }


  /**
   * Carga una lista de archivos Markdown, los combina y actualiza la señal
   */
  loadMarkdownList(paths: string[] = ['assets/datos.md', 'assets/datos1.md']) {
    const requests = paths.map(path => 
      this.http.get(path, { responseType: 'text' })
    );

    forkJoin(requests).subscribe(responses => {
      let allBlocks: MarkdownBlock[] = [];
      responses.forEach(mdContent => {
        const parsedBlocks = this.parseMarkdown(mdContent);
        allBlocks = [...allBlocks, ...parsedBlocks];
      });

      this.blocks.set(allBlocks);
      this.headings.set(allBlocks.filter(b => b.type === 'heading'));
    });
  }


loadMarkdownListb() {
   this.http.get<any>('assets/index.json').subscribe(res =>{
    const listFiles = res.markdownFiles;
    if(listFiles != undefined && listFiles != null && listFiles.length > 0 ){
      this.loadMarkdownList(listFiles);
    }
  });
  
}

  private parseMarkdown(md: string): MarkdownBlock[] {
    const lines = md.split('\n');
    const blocks: MarkdownBlock[] = [];
    let inCode = false;
    let codeBuffer: string[] = [];
    let tableBuffer: string[] = [];
    let lang = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // --- BLOQUES DE CÓDIGO ---
      if (trimmedLine.startsWith('```')) {
        inCode = !inCode;
        if (!inCode) {
          blocks.push({
            id: crypto.randomUUID(),
            type: 'code',
            content: codeBuffer.join('\n'),
            language: lang
          });
          codeBuffer = [];
          lang = '';
        } else {
          lang = trimmedLine.replace('```', '').trim();
        }
        continue;
      }

      if (inCode) {
        codeBuffer.push(line);
        continue;
      }

      // --- TABLAS ---
      if (trimmedLine.startsWith('|')) {
        tableBuffer.push(trimmedLine);
        // Si la siguiente línea no es tabla, procesamos el buffer
        if (i === lines.length - 1 || !lines[i + 1].trim().startsWith('|')) {
          blocks.push({
            id: crypto.randomUUID(),
            type: 'table' as any,
            content: this.parseTable(tableBuffer)
          });
          tableBuffer = [];
        }
        continue;
      }

      // --- HEADINGS ---
      const h = trimmedLine.match(/^(#{1,6})\s+(.*)$/);
      if (h) {
        blocks.push({
          id: crypto.randomUUID(),
          type: 'heading',
          level: h[1].length,
          content: this.parseInlineStyles(h[2])
        });
        continue;
      }

      // --- PÁRRAFOS ---
      if (trimmedLine) {
        blocks.push({
          id: crypto.randomUUID(),
          type: 'paragraph',
          content: this.parseInlineStyles(trimmedLine)
        });
      }
    }

    return blocks;
  }
}



