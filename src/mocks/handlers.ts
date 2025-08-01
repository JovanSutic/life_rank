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
  healthcareCityData,
  healthcareCountryData,
  taxesCountryData,
  blogData,
  layerBudget,
  layerTaxes,
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
  http.get(`${import.meta.env.VITE_API_URL}/layers`, async ({ request }) => {
    try {
      const url = new URL(request.url);
      const params = Object.fromEntries(url.searchParams);

      if (params.layerTypeId === '3') {
        return HttpResponse.json(layerTaxes);
      }
      await delay(700);
      return HttpResponse.json(layerBudget);
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
  http.get(`${import.meta.env.VITE_API_URL}/def_value/by-field`, async ({ request }) => {
    try {
      await delay(700);
      const url = new URL(request.url);
      const params = Object.fromEntries(url.searchParams);

      if (params.field === 'tax') {
        return HttpResponse.json(taxesCountryData);
      }

      const response = Object.keys(params).find((key) => key === 'cityId')
        ? healthcareCityData
        : healthcareCountryData;
      return HttpResponse.json(response);
    } catch (error) {
      console.error('Failed to parse request:', error);
      return HttpResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
  }),
  http.get(`${import.meta.env.VITE_API_URL}/blogs/slug/:slug`, async () => {
    try {
      await delay(700);
      return HttpResponse.json(blogData);
    } catch (error) {
      console.error('Failed to parse request:', error);
      return HttpResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }
  }),
];
