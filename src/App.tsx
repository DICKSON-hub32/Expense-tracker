import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './hooks/useAppContext';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Goals from './pages/Goals';
import Explorer from './pages/Explorer';
import Onboarding from './pages/Onboarding';
import Settings from './pages/Settings';
import { useEffect } from 'react';
const AppContent: React.FC = () => {
  const { user } = useAppContext();

  if (!user.onboarded) {
    return <Onboarding />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").catch((err) => {
        console.error('Service worker registration failed:', err);
      });
    }
  }, []);

  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
