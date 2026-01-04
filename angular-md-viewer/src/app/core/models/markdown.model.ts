
export type MarkdownBlockType = 'heading' | 'paragraph' | 'code' | 'table';
export interface MarkdownBlock {
  id: string;
  type: MarkdownBlockType;
  level?: number;
  content: string;
  language?: string;
}