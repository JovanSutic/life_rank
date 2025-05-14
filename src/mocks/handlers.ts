import { delay, http, HttpResponse } from 'msw';
import { cities, budgets } from './data';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/cities`, async () => {
    try {
      await delay(700);
      return HttpResponse.json({ data: cities, limit: 30, total: 100 });
    } catch (error) {
      console.error('Failed to parse request:', error);
      return HttpResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
  }),
  http.get(`${import.meta.env.VITE_API_URL}/social_lifestyle`, async () => {
    try {
      await delay(700);
      return HttpResponse.json({ data: budgets });
    } catch (error) {
      console.error('Failed to parse request:', error);
      return HttpResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
  }),
];
