import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Divider,
} from '@mui/material';
import { ArrowBack, LocalShipping } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useUserData } from '../contexts/UserDataContext';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { orderHistory } = useUserData();

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Order History
        </Typography>
      </Box>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {orderHistory.length === 0 ? (
          <Card sx={{ textAlign: 'center', py: 4 }}>
            <LocalShipping sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No orders yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your order history will appear here
            </Typography>
          </Card>
        ) : (
          <List>
            {orderHistory.map((order) => (
              <Card key={order.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Order #{order.id}
                    </Typography>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {formatDate(order.date)}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  {order.items.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        py: 1,
                      }}
                    >
                      <Typography variant="body2">
                        {item.quantity}x {item.name}
                      </Typography>
                      <Typography variant="body2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mt: 1,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Total
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      ${order.total.toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </List>
        )}
      </motion.div>
    </Box>
  );
};

export default OrderHistory;
