import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import BreathingExercisePage from './pages/BreathingExercisePage';
import DiaryPage from './pages/DiaryPage';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  )
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: WelcomePage
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home',
  component: HomePage
});

const breathingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/breathing',
  component: BreathingExercisePage
});

const diaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/diary',
  component: DiaryPage
});

const routeTree = rootRoute.addChildren([indexRoute, homeRoute, breathingRoute, diaryRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
