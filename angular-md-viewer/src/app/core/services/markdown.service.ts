// import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { MarkdownBlock } from '../models/markdown.model';

// @Injectable({ providedIn: 'root' })
// export class MarkdownService {
//   blocks = signal<MarkdownBlock[]>([]);
//   headings = signal<MarkdownBlock[]>([]);

//   constructor(private http: HttpClient) { }


//   loadMarkdown(path: string) {
//     this.http.get(path, { responseType: 'text' }).subscribe(md => {
//       const parsed = this.parseMarkdown(md);
//       this.blocks.set(parsed);
//       this.headings.set(parsed.filter(b => b.type === 'heading'));
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
//             id: crypto.randomUUID(),
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

//       const h = line.match(/^(#{1,6})\s+(.*)$/);
//       if (h) {
//         blocks.push({
//           id: crypto.randomUUID(),
//           type: 'heading',
//           level: h[1].length,
//           content: h[2]
//         });
//       } else if (line.trim()) {
//         blocks.push({
//           id: crypto.randomUUID(),
//           type: 'paragraph',
//           content: line
//         });
//       }
//     });

//     return blocks;
//   }
// }


import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs'; // Importamos forkJoin
import { MarkdownBlock } from '../models/markdown.model';

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  blocks = signal<MarkdownBlock[]>([]);
  headings = signal<MarkdownBlock[]>([]);

  constructor(private http: HttpClient) { }

  /**
   * Carga un solo archivo Markdown (comportamiento original)
   */
  loadMarkdown(path: string) {
    this.http.get(path, { responseType: 'text' }).subscribe(md => {
      const parsed = this.parseMarkdown(md);
      this.blocks.set(parsed);
      this.headings.set(parsed.filter(b => b.type === 'heading'));
    });
  }

  /**
   * Carga una lista de archivos Markdown, los combina y actualiza la señal
   * @param paths Lista de rutas, ej: ['assets/datos.md', 'assets/datos2.md']
   */
  loadMarkdownList(paths: string[] = ['assets/datos.md', 'assets/datos2.md']) {
    // 1. Creamos un array de Observables (peticiones HTTP)
    const requests = paths.map(path => 
      this.http.get(path, { responseType: 'text' })
    );

    // 2. forkJoin espera a que TODAS las peticiones terminen
    forkJoin(requests).subscribe(responses => {
      let allBlocks: MarkdownBlock[] = [];

      // 3. Iteramos sobre cada respuesta de texto (cada archivo md)
      responses.forEach(mdContent => {
        const parsedBlocks = this.parseMarkdown(mdContent);
        // Concatenamos los bloques del archivo actual al total
        allBlocks = [...allBlocks, ...parsedBlocks];
      });

      // 4. Actualizamos las señales una sola vez con todo el contenido unido
      this.blocks.set(allBlocks);
      this.headings.set(allBlocks.filter(b => b.type === 'heading'));
    });
  }

  private parseMarkdown(md: string): MarkdownBlock[] {
    const lines = md.split('\n');
    const blocks: MarkdownBlock[] = [];
    let inCode = false;
    let buffer: string[] = [];
    let lang = '';

    lines.forEach(line => {
      if (line.startsWith('```')) {
        inCode = !inCode;
        if (!inCode) {
          blocks.push({
            id: crypto.randomUUID(), // Nota: crypto.randomUUID() solo funciona en contextos seguros (HTTPS/localhost)
            type: 'code',
            content: buffer.join('\n'),
            language: lang
          });
          buffer = [];
          lang = '';
        } else {
          lang = line.replace('```', '').trim();
        }
        return;
      }

      if (inCode) {
        buffer.push(line);
        return;
      }

      const h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) {
        blocks.push({
          id: crypto.randomUUID(),
          type: 'heading',
          level: h[1].length,
          content: h[2]
        });
      } else if (line.trim()) {
        blocks.push({
          id: crypto.randomUUID(),
          type: 'paragraph',
          content: line
        });
      }
    });

    return blocks;
  }
}