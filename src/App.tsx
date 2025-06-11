import './App.css';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import { lazy, Suspense, useEffect } from 'react';
import LoadingOverlay from './components/Basic/LoadingOverlay';
import { initGA } from './utils/analytics';

const EuropeMap = lazy(() => import('./pages/EuropeMap'));
const BudgetPlay = lazy(() => import('./pages/BudgetPlay'));

function App() {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route
        path="/europe"
        element={
          <Suspense
            fallback={
              <div>
                <LoadingOverlay />
              </div>
            }
          >
            <EuropeMap />
          </Suspense>
        }
      />
      <Route
        path="/budget/:name"
        element={
          <Suspense
            fallback={
              <div>
                <LoadingOverlay />
              </div>
            }
          >
            <BudgetPlay />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
