import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { MarkdownBlock } from '../models/markdown.model';

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  blocks = signal<MarkdownBlock[]>([]);
  headings = signal<MarkdownBlock[]>([]);

  constructor(private http: HttpClient) { }

  /**
   * Procesa estilos internos como negritas **texto** y código inline `codigo`
   */
  private parseInlineStyles(text: string): string {
  return text
    // Negritas: **texto**
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-blue-600 dark:text-blue-400">$1</strong>')
    
    // Código inline: `texto` -> Cambiado a color rojo (text-red-600)
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-red-600 dark:text-red-400 border border-gray-200 dark:border-gray-700">$1</code>');
}

  /**
   * Transforma un array de líneas de tabla Markdown en un string de tabla HTML con Tailwind
   */
  private parseTable(rows: string[]): string {
    // Filtramos la línea de separación típica de markdown |---|---|
    const filteredRows = rows.filter(r => !r.match(/^\|?\s?[:-]+\s?\|/));
    
    let html = '<div class="overflow-x-auto my-6 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">';
    html += '<table class="w-full text-sm text-left border-collapse">';
    
    filteredRows.forEach((row, index) => {
      // Separar por pipes y limpiar espacios, ignorando los pipes vacíos de los extremos
      const cells = row.split('|').filter((cell, i, arr) => {
        if (i === 0 && cell.trim() === '') return false;
        if (i === arr.length - 1 && cell.trim() === '') return false;
        return true;
      });

      const isHeader = index === 0;
      const tag = isHeader ? 'th' : 'td';
      const rowClass = isHeader 
        ? 'bg-gray-100 dark:bg-gray-700/50 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700' 
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





// import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { forkJoin } from 'rxjs'; // Importamos forkJoin
// import { MarkdownBlock } from '../models/markdown.model';

// @Injectable({ providedIn: 'root' })
// export class MarkdownService {
//   blocks = signal<MarkdownBlock[]>([]);
//   headings = signal<MarkdownBlock[]>([]);

//   constructor(private http: HttpClient) { }

//   /**
//    * Carga un solo archivo Markdown (comportamiento original)
//    */
//   loadMarkdown(path: string) {
//     this.http.get(path, { responseType: 'text' }).subscribe(md => {
//       const parsed = this.parseMarkdown(md);
//       this.blocks.set(parsed);
//       this.headings.set(parsed.filter(b => b.type === 'heading'));
//     });
//   }

//   /**
//    * Carga una lista de archivos Markdown, los combina y actualiza la señal
//    * @param paths Lista de rutas, ej: ['assets/datos.md', 'assets/datos2.md']
//    */
//   loadMarkdownList(paths: string[] = ['assets/datos.md', 'assets/datos1.md']) {
//     // 1. Creamos un array de Observables (peticiones HTTP)
//     const requests = paths.map(path =>
//       this.http.get(path, { responseType: 'text' })
//     );

//     // 2. forkJoin espera a que TODAS las peticiones terminen
//     forkJoin(requests).subscribe(responses => {
//       let allBlocks: MarkdownBlock[] = [];

//       // 3. Iteramos sobre cada respuesta de texto (cada archivo md)
//       responses.forEach(mdContent => {
//         const parsedBlocks = this.parseMarkdown(mdContent);
//         // Concatenamos los bloques del archivo actual al total
//         allBlocks = [...allBlocks, ...parsedBlocks];
//       });

//       // 4. Actualizamos las señales una sola vez con todo el contenido unido
//       this.blocks.set(allBlocks);
//       this.headings.set(allBlocks.filter(b => b.type === 'heading'));
//     });
//   }

//   private parseMarkdown(md: string): MarkdownBlock[] {
//     const lines = md.split('\n');
//     const blocks: MarkdownBlock[] = [];
//     let inCode = false;
//     let buffer: string[] = [];
//     let lang = '';

//     lines.forEach(line => {
//       if (line.startsWith('```')) {
//         inCode = !inCode;
//         if (!inCode) {
//           blocks.push({
//             id: crypto.randomUUID(), // Nota: crypto.randomUUID() solo funciona en contextos seguros (HTTPS/localhost)
//             type: 'code',
//             content: buffer.join('\n'),
//             language: lang
//           });
//           buffer = [];
//           lang = '';
//         } else {
//           lang = line.replace('```', '').trim();
//         }
//         return;
//       }

//       if (inCode) {
//         buffer.push(line);
//         return;
//       }

//       // const h = line.match(/^(#{1,6})\s+(.*)$/);
//       // if (h) {
//       //   blocks.push({
//       //     id: crypto.randomUUID(),
//       //     type: 'heading',
//       //     level: h[1].length,
//       //     content: h[2]
//       //   });
//       // } else if (line.trim()) {
//       //   blocks.push({
//       //     id: crypto.randomUUID(),
//       //     type: 'paragraph',
//       //     content: line
//       //   });
//       // }
//       const h = line.match(/^(#{1,6})\s+(.*)$/);
//       if (h) {
//         blocks.push({
//           id: crypto.randomUUID(),
//           type: 'heading',
//           level: h[1].length,
//           content: this.parseInlineStyles(h[2]) // <--- Aplicar aquí
//         });
//       } else if (line.trim()) {
//         blocks.push({
//           id: crypto.randomUUID(),
//           type: 'paragraph',
//           content: this.parseInlineStyles(line) // <--- Aplicar aquí
//         });
//       }

//     });

//     return blocks;
//   }
//   private parseInlineStyles(text: string): string {
//     // Busca **texto** y lo reemplaza por un span con clase
//     return text.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-blue-600 dark:text-blue-400">$1</span>');
//   }
// }