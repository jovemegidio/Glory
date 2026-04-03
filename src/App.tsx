import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChurchProvider } from './contexts/ChurchContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';

// Pages
import Dashboard from './pages/Dashboard';
import MemberHome from './pages/MemberHome';
import Groups from './pages/Groups';
import Timeline from './pages/Timeline';
import Messages from './pages/Messages';
import Pages from './pages/Pages';
import CalendarPage from './pages/Calendar';
import Events from './pages/Events';
import Banners from './pages/Banners';
import LiveStream from './pages/LiveStream';
import Bible from './pages/Bible';
import Notes from './pages/Notes';
import Donations from './pages/Donations';
import Finance from './pages/Finance';
import Notifications from './pages/Notifications';
import Prayer from './pages/Prayer';
import Downloads from './pages/Downloads';
import Members from './pages/Members';
import Settings from './pages/Settings';
import Devotionals from './pages/Devotionals';
import Attendance from './pages/Attendance';
import Volunteers from './pages/Volunteers';
import Courses from './pages/Courses';
import Gallery from './pages/Gallery';
import Forms from './pages/Forms';

function AppRoutes() {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <ChurchProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={isAdmin ? <Dashboard /> : <MemberHome />} />
          <Route path="groups" element={<Groups />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="messages" element={<Messages />} />
          {isAdmin && <Route path="pages" element={<Pages />} />}
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="events" element={<Events />} />
          {isAdmin && <Route path="banners" element={<Banners />} />}
          <Route path="live" element={<LiveStream />} />
          <Route path="bible" element={<Bible />} />
          <Route path="notes" element={<Notes />} />
          <Route path="donations" element={<Donations />} />
          {isAdmin && <Route path="finance" element={<Finance />} />}
          {isAdmin && <Route path="notifications" element={<Notifications />} />}
          <Route path="prayer" element={<Prayer />} />
          <Route path="downloads" element={<Downloads />} />
          {isAdmin && <Route path="members" element={<Members />} />}
          <Route path="devotionals" element={<Devotionals />} />
          {isAdmin && <Route path="attendance" element={<Attendance />} />}
          {isAdmin && <Route path="volunteers" element={<Volunteers />} />}
          <Route path="courses" element={<Courses />} />
          <Route path="gallery" element={<Gallery />} />
          {isAdmin && <Route path="forms" element={<Forms />} />}
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ChurchProvider>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
}
