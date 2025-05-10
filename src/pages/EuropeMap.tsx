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
        <div className="p-4">Right Sidebar</div>
      </MapLayout.Right>
    </MapLayout>
  );
}

export default EuropeMap;
