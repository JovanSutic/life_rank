import { delay, http, HttpResponse } from 'msw';
import { cities } from './data';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/cities`, async () => {
    try {
      await delay(700);
      return HttpResponse.json(cities);
    } catch (error) {
      console.error('Failed to parse request:', error);
      return HttpResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
  }),
];
