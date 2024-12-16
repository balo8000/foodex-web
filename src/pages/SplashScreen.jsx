import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate('/welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: [0.5, 1.2, 1],
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          times: [0, 0.6, 1]
        }}
      >
        <RestaurantIcon
          sx={{
            fontSize: 80,
            color: 'primary.main',
            filter: 'drop-shadow(0px 4px 8px rgba(76, 175, 80, 0.3))',
            mb: 2,
          }}
        />
      </motion.div>

      <Typography
        variant="h3"
        component={motion.h3}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          mb: 1,
          textAlign: 'center',
        }}
      >
        Foodex
      </Typography>

      <Typography
        variant="h6"
        component={motion.h6}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        sx={{
          color: 'text.secondary',
          mb: 4,
          textAlign: 'center',
          maxWidth: '80%',
        }}
      >
        Delicious food at your doorstep
      </Typography>

      <Box
        component={motion.div}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.7,
          duration: 0.5,
          type: "spring",
          stiffness: 200,
        }}
      >
        <CircularProgress
          size={48}
          thickness={4}
          sx={{
            color: 'primary.main',
            filter: 'drop-shadow(0px 2px 4px rgba(76, 175, 80, 0.2))',
          }}
        />
      </Box>

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ opacity: 0.7 }}
        >
          2024 Foodex
        </Typography>
      </Box>
    </Box>
  );
};

export default SplashScreen;
