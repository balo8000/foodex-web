import { useNavigate, useLocation } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction, useTheme, useMediaQuery } from '@mui/material';
import { Home, RestaurantMenu, ShoppingCart, Person } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const FancyBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 480px)');

  const navItems = [
    { label: 'Home', value: '/home', icon: Home },
    { label: 'Menu', value: '/menu', icon: RestaurantMenu },
    { label: 'Cart', value: '/cart', icon: ShoppingCart },
    { label: 'Profile', value: '/profile', icon: Person },
  ];

  return (
    <Paper
      component={motion.div}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderRadius: isMobile ? '24px 24px 0 0' : '16px',
        overflow: 'hidden',
        mx: isMobile ? 0 : 2,
        mb: isMobile ? 0 : 2,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.background.paper
          : theme.palette.background.default,
      }}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(_, newValue) => navigate(newValue)}
        sx={{
          height: isMobile ? 70 : 65,
          backgroundColor: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 0',
            color: theme.palette.text.secondary,
            '&.Mui-selected': {
              color: theme.palette.primary.main,
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              '&.Mui-selected': {
                fontSize: '0.75rem',
              },
            },
          },
        }}
      >
        {navItems.map(({ label, value, icon: Icon }) => (
          <BottomNavigationAction
            key={value}
            label={
              <motion.span
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{ 
                  scale: location.pathname === value ? 1 : 0.9,
                  opacity: location.pathname === value ? 1 : 0.8
                }}
              >
                {label}
              </motion.span>
            }
            value={value}
            icon={
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: location.pathname === value ? 1 : 0.8,
                  y: location.pathname === value ? -4 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon sx={{ fontSize: isMobile ? 24 : 22 }} />
              </motion.div>
            }
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default FancyBottomNav;
