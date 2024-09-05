export interface TemplateInfo {
  id: string;
  author: string;
  disabled: boolean;
  name: string;
  stacks: string[];
  version: string;
  mode: 'copy' | 'degit' | 'script';
  source?: string;
}
