import './App.css';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import { lazy, Suspense, useEffect } from 'react';
import LoadingOverlay from './components/Basic/LoadingOverlay';
import { initGA } from './utils/analytics';
import NotFound from './pages/NotFound';
import BlogPage from './pages/BlogPage';
import ScrollTop from './components/Basic/ScrollTop';
import HealthCarePage from './pages/HealthcarePage';
import TaxesPage from './pages/TaxesPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AuthGuard from './components/AuthGuard';

const EuropeMap = lazy(() => import('./pages/EuropeMap'));
const BudgetPlay = lazy(() => import('./pages/BudgetPlay'));

function App() {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <>
      <ScrollTop />
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
        <Route
          path="/healthcare/:name"
          element={
            <Suspense
              fallback={
                <div>
                  <LoadingOverlay />
                </div>
              }
            >
              <HealthCarePage />
            </Suspense>
          }
        />
        <Route
          path="/taxes/:country"
          element={
            <Suspense
              fallback={
                <div>
                  <LoadingOverlay />
                </div>
              }
            >
              <TaxesPage />
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense
              fallback={
                <div>
                  <LoadingOverlay />
                </div>
              }
            >
              <BlogPage />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <AuthGuard isProtected={false} redirectPath="/dashboard">
              <Suspense
                fallback={
                  <div>
                    <LoadingOverlay />
                  </div>
                }
              >
                <LoginPage />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthGuard isProtected={true} redirectPath="/login?type=login">
              <Suspense
                fallback={
                  <div>
                    <LoadingOverlay />
                  </div>
                }
              >
                <DashboardPage />
              </Suspense>
            </AuthGuard>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
