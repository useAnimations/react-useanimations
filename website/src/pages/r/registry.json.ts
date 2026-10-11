import { json } from '../../lib/http';
import { registry } from '../../lib/registry';

export const GET = () => json(registry());
