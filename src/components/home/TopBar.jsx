import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Box,
  useTheme,
  alpha,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  ShoppingCart,
  Notifications,
  Person,
  Settings,
  Logout,
  Favorite,
  DarkMode,
  LightMode,
  AccountCircle,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../context/UserContext';

const TopBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateUser } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenu = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const toggleTheme = () => {
    updateUser({
      preferences: {
        ...user.preferences,
        darkMode: !user.preferences?.darkMode,
      },
    });
  };

  const notifications = [
    { id: 1, text: 'Your order is on the way!', time: '5 min ago' },
    { id: 2, text: '20% off on your next order', time: '1 hour ago' },
    { id: 3, text: 'New restaurants in your area', time: '2 hours ago' },
  ];

  const handleProfileClick = () => {
    navigate('/profile');
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 2 : 0}
      sx={{
        bgcolor: theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.default, scrolled ? 0.9 : 0.8)
          : alpha(theme.palette.background.paper, scrolled ? 0.9 : 0.8),
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.palette.mode === 'dark'
          ? alpha(theme.palette.divider, 0.1)
          : alpha(theme.palette.divider, 0.1)}`,
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 64, sm: 70 } }}>
        {/* Logo */}
        <Box
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          sx={{ 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
          onClick={() => navigate('/')}
        >
          <img
            src="/logo.png"
            alt="Foodex"
            style={{ height: 40 }}
          />
          <Typography
            variant="h6"
            sx={{
              display: { xs: 'none', sm: 'block' },
              fontWeight: 600,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #fff 30%, #f5f5f5 90%)'
                : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Foodex
          </Typography>
        </Box>

        {/* Right Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          {/* Theme Toggle */}
          <Tooltip title={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: theme.palette.mode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>

          {/* Favorites */}
          <Tooltip title="Favorites">
            <IconButton
              sx={{
                color: theme.palette.mode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <Badge 
                badgeContent={3} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: theme.palette.mode === 'dark'
                      ? theme.palette.error.dark
                      : theme.palette.error.main,
                  },
                }}
              >
                <Favorite />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Cart */}
          <Tooltip title="Cart">
            <IconButton
              onClick={() => navigate('/cart')}
              sx={{
                color: theme.palette.mode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <Badge 
                badgeContent={2} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: theme.palette.mode === 'dark'
                      ? theme.palette.error.dark
                      : theme.palette.error.main,
                  },
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              onClick={handleNotificationMenu}
              sx={{
                color: theme.palette.mode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <Badge 
                badgeContent={notifications.length} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: theme.palette.mode === 'dark'
                      ? theme.palette.error.dark
                      : theme.palette.error.main,
                  },
                }}
              >
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile */}
          <Box sx={{ position: 'relative' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenu}
                sx={{
                  p: 0.5,
                  ml: { xs: 0.5, sm: 1 },
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    border: `2px solid ${theme.palette.primary.main}`,
                  },
                }}
              >
                {user?.profilePicture ? (
                  <Avatar
                    src={user.profilePicture}
                    alt={user?.name || 'User'}
                    sx={{
                      width: 32,
                      height: 32,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  />
                ) : (
                  <AccountCircle
                    sx={{
                      width: 32,
                      height: 32,
                      color: theme.palette.primary.main,
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                mt: 1.5,
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
          >
            <MenuItem onClick={handleProfileClick}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => navigate('/settings')}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>

          {/* Notifications Menu */}
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationClose}
            onClick={handleNotificationClose}
            PaperProps={{
              sx: {
                width: 320,
                maxHeight: 400,
                overflow: 'auto',
                mt: 1.5,
                '& .MuiMenuItem-root': {
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                },
              },
            }}
          >
            <AnimatePresence>
              {notifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    py: 1.5,
                  }}
                >
                  <Box sx={{ color: 'text.primary', mb: 0.5 }}>
                    {notification.text}
                  </Box>
                  <Box sx={{ 
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: theme.palette.primary.main,
                      }}
                    />
                    {notification.time}
                  </Box>
                </MenuItem>
              ))}
            </AnimatePresence>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
