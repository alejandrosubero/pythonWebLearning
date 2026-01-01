import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarkdownBlock } from '../models/markdown.model';

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  blocks = signal<MarkdownBlock[]>([]);
  headings = signal<MarkdownBlock[]>([]);

  constructor(private http: HttpClient) {}

  loadMarkdown(path: string) {
    this.http.get(path, { responseType: 'text' }).subscribe(md => {
      const parsed = this.parseMarkdown(md);
      this.blocks.set(parsed);
      this.headings.set(parsed.filter(b => b.type === 'heading'));
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
            id: crypto.randomUUID(),
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