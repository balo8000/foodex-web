import { Box, Typography, Avatar, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { LocationOn } from '@mui/icons-material';

const WelcomeHeader = () => {
  const theme = useTheme();
  const user = {
    name: 'John',
    avatar: '/avatar-placeholder.jpg',
    location: 'New York, US'
  };

  return (
    <Box
      component={motion.div}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 3,
        bgcolor: theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.6)
          : theme.palette.background.paper,
        boxShadow: theme.palette.mode === 'dark'
          ? `0 4px 20px ${alpha(theme.palette.common.black, 0.2)}`
          : '0 4px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{
            width: 56,
            height: 56,
            border: `2px solid ${theme.palette.primary.main}`,
            bgcolor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.2)
              : theme.palette.primary.lighter,
          }}
        />
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: theme.palette.mode === 'dark'
                ? theme.palette.common.white
                : theme.palette.common.black,
            }}
          >
            Welcome back, {user.name}!
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
            <LocationOn
              fontSize="small"
              sx={{
                color: theme.palette.mode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.mode === 'dark'
                  ? theme.palette.text.secondary
                  : theme.palette.text.primary,
              }}
            >
              {user.location}
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.mode === 'dark'
            ? theme.palette.text.secondary
            : theme.palette.text.primary,
        }}
      >
        What would you like to eat today?
      </Typography>
    </Box>
  );
};

export default WelcomeHeader;
