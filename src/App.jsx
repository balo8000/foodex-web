import { useState, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { useUser } from './context/UserContext';
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
import MainLayout from './components/MainLayout';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#4CAF50',
      light: mode === 'dark' ? '#81C784' : '#E8F5E9',
      dark: '#388E3C',
      contrastText: '#fff',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#F5F5F5',
      paper: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
    },
    error: {
      main: '#FF4B3A',
    },
    text: {
      primary: mode === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.87)',
      secondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
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
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

const ProtectedRoute = ({ children }) => {
  // Add your authentication logic here
  const isAuthenticated = true; // For demo purposes
  return isAuthenticated ? children : <Navigate to="/welcome" />;
};

function AppContent() {
  const [mode, setMode] = useState('light');
  const { user } = useUser();
  const theme = useMemo(() => getTheme(user?.preferences?.darkMode ? 'dark' : mode), [user?.preferences?.darkMode, mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </UserProvider>
  );
}

export default App;
