import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OrderIcon from '../assets/order-icon.svg';
import PaymentIcon from '../assets/payment-icon.svg';
import DeliveryIcon from '../assets/delivery-icon.svg';

const FeatureItem = ({ icon, title, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
  >
    <Box sx={{ mr: 2 }}>
      <img src={icon} alt={title} style={{ width: 40, height: 40 }} />
    </Box>
    <Typography variant="h6">{title}</Typography>
  </motion.div>
);

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
            Food Delivery
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Your favorite foods delivered fast
          </Typography>
        </motion.div>

        <Box sx={{ my: 4 }}>
          <FeatureItem icon={OrderIcon} title="Easy Food Ordering" delay={0.2} />
          <FeatureItem icon={PaymentIcon} title="Simple Payment" delay={0.4} />
          <FeatureItem icon={DeliveryIcon} title="Fast Delivery" delay={0.6} />
        </Box>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{
            backgroundColor: '#FF4B3A',
            color: 'white',
            py: 2,
            borderRadius: '15px',
            '&:hover': {
              backgroundColor: '#ff3621',
            },
          }}
          onClick={() => navigate('/home')}
        >
          Get Started
        </Button>
      </motion.div>
    </Box>
  );
};

export default WelcomeScreen;
