// English, the source language: every other language's messages have this shape (type Messages).
import { common } from './common';
import { docs } from './docs';
import { home } from './home';
import { hubs } from './hubs';
import { islands } from './islands';
import { licence } from './licence';
import { pages } from './pages';
import { taxonomy } from './taxonomy';

export const messages = { common, taxonomy, hubs, home, docs, licence, pages, islands };

export type Messages = typeof messages;
