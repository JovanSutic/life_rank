import { delay, http, HttpResponse } from 'msw';
import {
  budgets,
  prices,
  crimesSummary,
  weatherData,
  contextData,
  cityFeelList,
  city,
  cityFeel,
} from './data';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/city-feel/:cityId`, async () => {
    try {
      await delay(700);
      return HttpResponse.json(cityFeel);
    } catch (error) {
      console.error('Failed to parse request:', error);
      return HttpResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
  }),
  http.get(`${import.meta.env.VITE_API_URL}/city-feel`, async () => {
    try {
      await delay(700);
      return HttpResponse.json(cityFeelList);
    } catch (error) {
      console.error('Failed to parse request:', error);
      return HttpResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
  }),
  http.get(`${import.meta.env.VITE_API_URL}/social_lifestyle`, async () => {
    try {
      await delay(700);
      return HttpResponse.json(budgets);
    } catch (error) {
      console.error('Failed to parse request:', error);
      return HttpResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
  }),
  http.get(`${import.meta.env.VITE_API_URL}/prices`, async () => {
    try {
      await delay(700);
      return HttpResponse.json(prices);
    } catch (error) {
      console.error('Failed to parse request:', error);
      return HttpResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
  }),
  http.get(`${import.meta.env.VITE_API_URL}/crimes/summary`, async () => {
    try {
      await delay(700);
      return HttpResponse.json(crimesSummary);
    } catch (error) {
      console.error('Failed to parse request:', error);
      return HttpResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
  }),
  http.get(`${import.meta.env.VITE_API_URL}/weathers/city/:id`, async () => {
    try {
      await delay(700);
      return HttpResponse.json(weatherData);
    } catch (error) {
      console.error('Failed to parse request:', error);
      return HttpResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
  }),
  http.get(`${import.meta.env.VITE_API_URL}/city-context/city/:id`, async () => {
    try {
      await delay(700);
      return HttpResponse.json(contextData);
    } catch (error) {
      console.error('Failed to parse request:', error);
      return HttpResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
  }),
  http.get(`${import.meta.env.VITE_API_URL}/cities/:id`, async () => {
    try {
      await delay(700);
      return HttpResponse.json(city);
    } catch (error) {
      console.error('Failed to parse request:', error);
      return HttpResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
  }),
];
