import type { ReactNode } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { KioskShell } from '@/components/kiosk/KioskShell';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

function Router() {
  return (
    <Switch>
      <Route path="/" component={KioskShell} />
      <Route component={NotFound} />
    </Switch>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <RoutedErrorBoundary><Router /></RoutedErrorBoundary>
    </WouterRouter>
  );
}

export default App;
