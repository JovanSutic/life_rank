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
  );
}

export default EuropeMap;
