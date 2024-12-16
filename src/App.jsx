import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import { UserDataProvider } from './contexts/UserDataContext';

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
import PageTransition from './components/PageTransition';

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

function ProtectedRoute({ children }) {
  // Add your authentication logic here
  const isAuthenticated = true; // For demo purposes
  return isAuthenticated ? children : <Navigate to="/welcome" />;
}

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <UserDataProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/welcome" element={<WelcomeScreen />} />
                <Route path="/auth" element={<AuthOptions />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                
                <Route 
                  path="/home" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <PageTransition>
                          <Home />
                        </PageTransition>
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/menu" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <PageTransition>
                          <RestaurantMenu />
                        </PageTransition>
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/cart" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <PageTransition>
                          <Cart />
                        </PageTransition>
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <PageTransition>
                          <Profile />
                        </PageTransition>
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/addresses" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <PageTransition>
                          <Addresses />
                        </PageTransition>
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/payment-methods" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <PageTransition>
                          <PaymentMethods />
                        </PageTransition>
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/order-history" 
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <PageTransition>
                          <OrderHistory />
                        </PageTransition>
                      </MainLayout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </CartProvider>
          </UserDataProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
