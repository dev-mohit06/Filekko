import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../common/context';

import LandingPage from '../pages/public/index';
import AuthPage from '../pages/auth-page';
import PrivacyPolicy from '../pages/legal/privacy-policy';
import TermsOfService from '../pages/legal/terms-of-service';
import ContactSection from '../pages/public/contact';
import ExplorationPage from '../pages/explore';
import NotFoundPage from '../pages/not-found';
import HomeLayout from '../components/home-layout';
import SettingsPage from '../pages/settings';
import VerificationPage from '../pages/verification';
import ProfilePage from '../pages/profile';
import BookmarkPage from '../pages/bookmarks';
import MyUploads from '../pages/my-uploads';
import UserProfile from '../pages/user-profile';
import CreateResource from '../pages/create-resources';
import ResourcePage from '../pages/resource';

// Route Wrapper for Dynamic Home
const HomeRoute = () => {
  const { isAuthenticated } = useUser();

  // Redirect based on authentication
  return isAuthenticated ? (
    <HomeLayout>
      <ExplorationPage />
    </HomeLayout>
  ) : (
    <LandingPage />
  );
};

// Protected Route Wrapper
const ProtectedRoute = () => {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

// Auth Route (redirects to homepage if authenticated)
const AuthRoute = () => {
  const { isAuthenticated } = useUser();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const LogoutRoute = () => {
  const { logout } = useUser();
  logout();
  return <Navigate to="/" replace />;
}

// Router Configuration
const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <HomeRoute />, // Dynamic Home Route
    },
    {
      path: '/legal',
      children: [
        {
          path: 'privacy',
          element: <PrivacyPolicy />,
        },
        {
          path: 'terms',
          element: <TermsOfService />,
        },
      ],
    },
    {
      path: '/contact-us',
      element: <ContactSection />,
    },
    {
      path: '/auth',
      element: <AuthRoute />,
      children: [
        {
          index: true,
          element: <AuthPage show="login" />,
        },
        {
          path: 'login',
          element: <AuthPage show="login" />,
        },
        {
          path: 'sign-up',
          element: <AuthPage />,
        },
        {
          path: 'verify-email/:token',
          element: <VerificationPage />,
        },
      ],
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <HomeLayout />,
          children: [
            {
              path: 'settings',
              element: <SettingsPage />,
            },
            {
              path: 'profile',
              element: <ProfilePage />,
            },
            {
              path: 'bookmarked',
              element: <BookmarkPage />,
            },
            {
              path: 'uploads',
              element: <MyUploads />,
            },
            {
              path: 'users/:username',
              element: <UserProfile />,
            },
            {
              path: 'create-resource',
              element: <CreateResource />,
            },
            {
              path: 'resource/:id',
              element: <ResourcePage />,
            },
            {
              path: 'logout',
              element: <LogoutRoute />,
            }
          ],
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

const router = createRouter();

export default router;