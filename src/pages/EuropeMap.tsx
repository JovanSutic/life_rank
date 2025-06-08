import CitySide from '../components/Sides/CitySide';
import MainContent from '../components/MainContent';
import MapFilters from '../components/Filters/MapFilters';
import MapLayout from '../components/Basic/MapLayout';

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
