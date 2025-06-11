import ReactGA from 'react-ga4';

const isDev = import.meta.env.DEV;

export const initGA = () => {
  if (!isDev) {
    console.log('ga initialized');
    ReactGA.initialize('G-TRFLXG80MY');
  }
};

export const trackPageview = (path: string) => {
  if (!isDev) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
) => {
  if (!isDev) {
    ReactGA.event(eventName, params);
  }
};
