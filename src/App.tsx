import './App.css';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import { lazy, Suspense } from 'react';
import LoadingOverlay from './components/LoadingOverlay';

const EuropeMap = lazy(() => import('./pages/EuropeMap'));
const BudgetPlay = lazy(() => import('./pages/BudgetPlay'));

function App() {
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
