import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthOptions = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
          Welcome to FoodEx
        </Typography>

        <Box sx={{ width: '100%', mb: 2 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              backgroundColor: '#FF4B3A',
              color: 'white',
              py: 2,
              borderRadius: '15px',
              mb: 2,
              '&:hover': {
                backgroundColor: '#ff3621',
              },
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            sx={{
              borderColor: '#FF4B3A',
              color: '#FF4B3A',
              py: 2,
              borderRadius: '15px',
              '&:hover': {
                borderColor: '#ff3621',
                backgroundColor: 'rgba(255, 75, 58, 0.04)',
              },
            }}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" align="center">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Typography>
      </motion.div>
    </Box>
  );
};

export default AuthOptions;
