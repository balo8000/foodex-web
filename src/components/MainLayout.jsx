import React from 'react';
import { Box, AppBar, Toolbar, IconButton, useTheme, Typography, Badge, Avatar } from '@mui/material';
import { DarkMode, LightMode, ShoppingCart } from '@mui/icons-material';
import FancyBottomNav from './navigation/FancyBottomNav';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { alpha } from '@mui/material/styles';

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, updatePreferences } = useUser();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleDarkMode = () => {
    updatePreferences({
      ...user?.preferences,
      darkMode: !user?.preferences?.darkMode,
    });
  };

  const TopBar = () => {
    return (
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          bgcolor: alpha(theme.palette.background.default, 0.8),
          backdropFilter: 'blur(20px)',
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                color: theme.palette.text.primary,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/home')}
            >
              FoodEx
            </Typography>

            <IconButton
              size="large"
              edge="end"
              onClick={() => navigate('/cart')}
              sx={{ position: 'relative' }}
            >
              <Badge badgeContent={totalItems} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              onClick={() => navigate('/profile')}
            >
              <Avatar
                src={user?.avatar}
                sx={{
                  width: 32,
                  height: 32,
                  border: `2px solid ${theme.palette.primary.main}`,
                }}
              />
            </IconButton>

            <IconButton onClick={toggleDarkMode} color="inherit">
              {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        maxHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <TopBar />
      <Box
        sx={{
          flex: 1,
          mt: 8, // Adjust top margin to account for fixed AppBar
          mb: 8, // Add bottom margin for bottom navigation
          overflowY: 'auto',
          px: 2,
        }}
      >
        {React.isValidElement(children) ? children : null}
      </Box>
      <FancyBottomNav />
    </Box>
  );
}

export default MainLayout;
