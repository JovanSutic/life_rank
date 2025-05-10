import MainContent from '../components/MainContent';
import Wrapper from '../components/Wrapper';

function EuropeMap() {
  console.log('alo');
  return (
    <Wrapper>
      <Wrapper.Left>
        <div className="p-4">Left Sidebar</div>
      </Wrapper.Left>

      <Wrapper.Main>
        <MainContent />
      </Wrapper.Main>

      <Wrapper.Right>
        <div className="p-4">Right Sidebar</div>
      </Wrapper.Right>
    </Wrapper>
  );
}

export default EuropeMap;
