import { Box } from '@mui/material';
import FancyBottomNav from './navigation/FancyBottomNav';

const MainLayout = ({ children }) => {
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
