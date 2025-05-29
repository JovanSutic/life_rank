import CitySide from '../components/sides/CitySide';
import MainContent from '../components/MainContent';
import MapFilters from '../components/MapFilters';
import MapLayout from '../components/MapLayout';

function EuropeMap() {
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
