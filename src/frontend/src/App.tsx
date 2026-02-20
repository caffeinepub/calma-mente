import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import BreathingExercisePage from './pages/BreathingExercisePage';
import DiaryPage from './pages/DiaryPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const welcomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: WelcomePage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home',
  component: HomePage,
});

const breathingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/breathing',
  component: BreathingExercisePage,
});

const diaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/diary',
  component: DiaryPage,
});

const routeTree = rootRoute.addChildren([
  welcomeRoute,
  homeRoute,
  breathingRoute,
  diaryRoute,
]);

const router = createRouter({ routeTree });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
