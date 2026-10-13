// Deutsch: the German messages, in the shape of the English ones (type Messages).
import type { Messages } from '../en';
import { common } from './common';
import { docs } from './docs';
import { home } from './home';
import { hubs } from './hubs';
import { islands } from './islands';
import { licence } from './licence';
import { pages } from './pages';
import { taxonomy } from './taxonomy';

export const messages: Messages = { common, taxonomy, hubs, home, docs, licence, pages, islands };
