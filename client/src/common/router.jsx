import { createBrowserRouter } from 'react-router-dom';

import LandingPage from '../pages/public/index';
import AuthPage from '../pages/auth-page';
import PrivacyPolicy from '../pages/legal/privacy-policy';
import TermsOfService from '../pages/legal/terms-of-service';
import Dashboard from '../pages/dashboard';
import ContactSection from '../pages/public/contact';
import ExplorationPage from '../pages/explore';
import NotFoundPage from '../pages/not-found';
import HomeLayout from '../components/home-layout';
import SettingsPage from '../pages/settings';
import VerificationPage from '../pages/Email Verification';
import ProfilePage from '../pages/profile';
import BookmarkPage from '../pages/bookmarks';
import MyUploads from '../pages/my-uploads';
import UserProfile from '../pages/user-profile';
import CreateResource from '../pages/create-resources';
import ResourcePage from '../pages/resource';

// Assuming you're getting this from your auth context/store
const isLoggedIn = false;

const router = createBrowserRouter([
  {
    path: '/',
    element: !isLoggedIn ? <LandingPage /> : <HomeLayout />,
    children: isLoggedIn ? [
      {
        index: true,
        element: <ExplorationPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path: 'bookmarked',
        element: <BookmarkPage />
      },
      {
        path: 'uploads',
        element: <MyUploads />
      },
      {
        path: 'users/:username',
        element: <UserProfile />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'create-resource',
        element: <CreateResource />
      },
      {
        path: 'resource/:id',
        element: <ResourcePage />
      }
    ] : []
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: <AuthPage show="login" />
      },
      {
        path: 'sign-up',
        element: <AuthPage />
      },
      {
        path: 'verify-email',
        element: <VerificationPage />
      }
    ]
  },
  {
    path: 'legal',
    children: [
      {
        path: 'privacy',
        element: <PrivacyPolicy />
      },
      {
        path: 'terms',
        element: <TermsOfService />
      }
    ]
  },
  {
    path: 'contact-us',
    element: <ContactSection />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

export default router;