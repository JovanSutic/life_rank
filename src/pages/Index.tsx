import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log('ovde');
    navigate('/europe');
  }, []);

  return <div></div>;
}

export default Index;
