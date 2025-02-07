import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';

// Public Pages
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/public/Home';
import Shop from './pages/public/Shop';
import About from './pages/public/About';
import Contact from './pages/public/Contact';

// Protected Pages
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import RiceVest from './pages/dashboard/RiceVest';
import Subscriptions from './pages/dashboard/Subscriptions';
import Orders from './pages/dashboard/Orders';
import Competitions from './pages/dashboard/Competitions';
import Profile from './pages/dashboard/Profile';

// Components
import RequireAuth from './components/auth/RequireAuth';
import SupportChat from './components/support/SupportChat';

function App() {
  const { setUser } = useAuthStore();
  const { loadCart } = useCartStore();

  useEffect(() => {
    // Initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          full_name: session.user.user_metadata.full_name,
        });
        loadCart();
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          full_name: session.user.user_metadata.full_name,
        });
        loadCart();
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, loadCart]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<RequireAuth><DashboardLayout /></RequireAuth>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/ricevest" element={<RiceVest />} />
          <Route path="/dashboard/subscriptions" element={<Subscriptions />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/competitions" element={<Competitions />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SupportChat />
    </Router>
  );
}

export default App;