import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Person as ProfileIcon,
  ArrowBack as BackIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const TopNavBar = ({ cartItemCount = 0, showBackButton = false, title = 'Foodex' }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCartClick = () => {
    // Handle cart click
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'background.paper',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {showBackButton && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleBackClick}
              sx={{ mr: 1 }}
            >
              <BackIcon sx={{ color: 'text.primary' }} />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'text.primary',
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            color="inherit"
            onClick={handleCartClick}
            sx={{
              backgroundColor: 'action.hover',
              '&:hover': { backgroundColor: 'action.selected' },
            }}
          >
            <Badge badgeContent={cartItemCount} color="primary">
              <CartIcon sx={{ color: 'text.primary' }} />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleProfileClick}
            sx={{
              backgroundColor: 'action.hover',
              '&:hover': { backgroundColor: 'action.selected' },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: theme.palette.primary.main,
              }}
            >
              <ProfileIcon />
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
