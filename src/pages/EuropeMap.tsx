import CitySide from '../components/Side/CitySide';
import MainContent from '../components/MainContent';
import MapFilters from '../components/Filters/MapFilters';
import MapLayout from '../components/Basic/MapLayout';
import { useEffect } from 'react';
import { trackPageview } from '../utils/analytics';

function EuropeMap() {
  useEffect(() => {
    trackPageview('/europe');
  }, []);

  return (
    <>
      <article>
        <title>{`Explore map of Europe and filter by budget, healthcare, taxes and safety | LifeRank`}</title>
        <meta
          name="description"
          content="Map of peaceful & affordable places in Europe, ideal for expats and nomads looking for their next destination."
        />
        <meta
          name="keywords"
          content={`map, explore map, affordable places, peaceful places, places Europe, map of Europe`}
        />
      </article>
      <MapLayout>
        <MapLayout.Left>
          <MapFilters />
        </MapLayout.Left>

        <MapLayout.Main>
          <MainContent />
        </MapLayout.Main>

        <MapLayout.Right>
          <CitySide />
        </MapLayout.Right>
      </MapLayout>
    </>
  );
}

export default EuropeMap;
