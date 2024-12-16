import { Box, AppBar, Toolbar, IconButton, useTheme } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import FancyBottomNav from './navigation/FancyBottomNav';
import { useUser } from '../contexts/UserContext';

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const { user, updatePreferences } = useUser();

  const toggleDarkMode = () => {
    updatePreferences({
      ...user?.preferences,
      darkMode: !user?.preferences?.darkMode,
    });
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
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          pb: { xs: 8, sm: 9 }, // Add padding for bottom nav
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '100%',
          zIndex: 1000,
          '@media (min-width: 481px)': {
            maxWidth: '480px',
          },
        }}
      >
        <FancyBottomNav />
      </Box>
    </Box>
  );
};

export default MainLayout;
