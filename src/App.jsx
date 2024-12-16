import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import { UserDataProvider } from './contexts/UserDataContext';
import { useUser } from './contexts/UserContext';
import PageTransition from './components/PageTransition';

// Pages
import SplashScreen from './pages/SplashScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import AuthOptions from './pages/AuthOptions';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RestaurantMenu from './pages/RestaurantMenu';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Addresses from './pages/Addresses';
import PaymentMethods from './pages/PaymentMethods';
import OrderHistory from './pages/OrderHistory';
import MainLayout from './components/MainLayout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#fff',
    },
    error: {
      main: '#FF4B3A',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/welcome" element={<WelcomeScreen />} />
      <Route path="/auth" element={<AuthOptions />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/home"
        element={
          <MainLayout>
            <PageTransition>
              <Home />
            </PageTransition>
          </MainLayout>
        }
      />
      <Route
        path="/menu"
        element={
          <MainLayout>
            <PageTransition>
              <RestaurantMenu />
            </PageTransition>
          </MainLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <MainLayout>
            <PageTransition>
              <Cart />
            </PageTransition>
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout>
            <PageTransition>
              <Profile />
            </PageTransition>
          </MainLayout>
        }
      />
      <Route
        path="/addresses"
        element={
          <MainLayout>
            <PageTransition>
              <Addresses />
            </PageTransition>
          </MainLayout>
        }
      />
      <Route
        path="/payment-methods"
        element={
          <MainLayout>
            <PageTransition>
              <PaymentMethods />
            </PageTransition>
          </MainLayout>
        }
      />
      <Route
        path="/order-history"
        element={
          <MainLayout>
            <PageTransition>
              <OrderHistory />
            </PageTransition>
          </MainLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <UserDataProvider>
            <CartProvider>
              <AppRoutes />
            </CartProvider>
          </UserDataProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
