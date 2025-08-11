import axios from 'axios';
import type {
  Blog,
  Budget,
  City,
  CityContext,
  CityFeel,
  CrimesSummary,
  Currency,
  FieldData,
  Layer,
  LayerType,
  Price,
  ReportDto,
  ReportItem,
  ReportUserData,
} from '../types/api.types';

export async function fetchCurrency(): Promise<Currency> {
  try {
    const res = await axios.get(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json'
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch cities:', error);
    throw error;
  }
}

export async function fetchCities(params: URLSearchParams): Promise<Layer[]> {
  try {
    let queryParams = `?layerTypeId=${params.get('layerTypeId')}&north=${params.get('north')}&south=${params.get('south')}&east=${params.get('east')}&west=${params.get('west')}&take=36&sortBy=rank&order=desc`;

    if (params.get('size')) {
      queryParams = `${queryParams}&size=${params.get('size')}`;
    }
    if (params.get('country')) {
      queryParams = `${queryParams}&country=${params.get('country')}`;
    }
    if (params.get('sea')) {
      queryParams = `${queryParams}&seaside=${params.get('sea')}`;
    }
    if (params.get('budget')) {
      queryParams = `${queryParams}&budget=${params.get('budget')}`;
    }
    if (params.get('rank') === 'true') {
      queryParams = `${queryParams}&rank=8`;
    }

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/layers${queryParams}`);
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch cities:', error);
    throw error;
  }
}

export async function fetchCity(cityId: number): Promise<City> {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/cities/${cityId}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch city:', error);
    throw error;
  }
}

export async function fetchBudgets(cityId: number): Promise<Budget[]> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/social_lifestyle?cityId=${cityId}`
    );
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch budgets:', error);
    throw error;
  }
}

export async function fetchSummary(cityId: number): Promise<CrimesSummary> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/crimes/summary?cityId=${cityId}&yearId=16`
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch summary:', error);
    throw error;
  }
}

export async function fetchCityContext(cityId: number): Promise<CityContext> {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/city-context/city/${cityId}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch city context:', error);
    throw error;
  }
}

export async function fetchFeel(cityId: number): Promise<CityFeel> {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/city-feel/${cityId}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch budgets:', error);
    throw error;
  }
}

export async function fetchPrices(cityId: number): Promise<Price[]> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/prices?sortBy=productId&order=asc&cityId=${cityId}&limit=60&priceType=CURRENT`
    );
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch prices:', error);
    throw error;
  }
}

export async function fetchHealthcare(
  id: number,
  type: 'countryId' | 'cityId'
): Promise<FieldData[]> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/def_value/by-field?field=healthcare&${type}=${id}`
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch healthcare values:', error);
    throw error;
  }
}

export async function fetchCountryTax(id: number): Promise<FieldData[]> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/def_value/by-field?field=tax&countryId=${id}`
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch tax values:', error);
    throw error;
  }
}

export async function fetchBlogBySlug(slug: string): Promise<Blog> {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/slug/${slug}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch blog by slug values:', error);
    throw error;
  }
}

export async function fetchLayerTypes(): Promise<LayerType[]> {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/layers/types/all`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch layer types:', error);
    throw error;
  }
}

export async function postPublicReport(
  data: ReportUserData
): Promise<{ net: number; save: number }> {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/reports/public`, data);
    return res.data;
  } catch (error) {
    console.error('Failed to post data to public reports:', error);
    throw error;
  }
}

export async function postReport(variables: {
  data: ReportUserData;
  token: string;
}): Promise<ReportDto> {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/reports/`, variables.data, {
      headers: {
        Authorization: `Bearer ${variables.token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to post data to reports:', error);
    throw error;
  }
}

export async function getUserReports(token: string): Promise<ReportItem[]> {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/reports`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch layer types:', error);
    throw error;
  }
}

export async function getUserReportById(id: number, token: string): Promise<ReportDto> {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/reports/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch layer types:', error);
    throw error;
  }
}
