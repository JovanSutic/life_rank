import ReactGA from 'react-ga4';

const isDev = import.meta.env.DEV;
const VITE_GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (!isDev && VITE_GA_MEASUREMENT_ID) {
    ReactGA.initialize(VITE_GA_MEASUREMENT_ID);
  }
};

export const trackPageview = (path: string) => {
  if (!isDev && VITE_GA_MEASUREMENT_ID) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
) => {
  if (!isDev && VITE_GA_MEASUREMENT_ID) {
    console.log('event', params);
    ReactGA.event(eventName, params);
  }
};
