import { text } from '../lib/http';
import { documentationMarkdown } from '../lib/markdown';

export const GET = () => text(documentationMarkdown(), 'text/markdown');
