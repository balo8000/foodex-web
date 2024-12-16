import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha,
  Collapse,
  Chip,
  Badge,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  Remove,
  Delete,
  LocalOffer,
  ShoppingBasket,
  RestaurantMenu,
  AccessTime,
  LocalShipping,
  CheckCircle,
  Info,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

const EmptyCart = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
        p: 3,
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
      >
        <ShoppingBasket 
          sx={{ 
            fontSize: 120,
            color: alpha(theme.palette.primary.main, 0.2),
            mb: 2 
          }} 
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          Your cart is empty!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Discover our delicious meals and add your favorites to the cart
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<RestaurantMenu />}
          onClick={() => navigate('/home')}
          sx={{
            bgcolor: theme.palette.primary.main,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
              transform: 'scale(1.02)',
            },
            transition: 'all 0.2s',
          }}
        >
          Browse Menu
        </Button>
      </motion.div>
    </Box>
  );
};

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const theme = useTheme();

  return (
    <Card
      component={motion.div}
      layout
      sx={{ 
        mb: 2,
        overflow: 'visible',
        borderRadius: 2,
        boxShadow: theme.shadows[2],
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{
              width: 60,
              height: 60,
              borderRadius: 1,
              objectFit: 'cover',
              mr: 2,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${item.price.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Remove />
            </IconButton>
            <Typography sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}>
              {item.quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              <Add />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Subtotal: ${(item.price * item.quantity).toFixed(2)}
          </Typography>
          <IconButton
            size="small"
            onClick={() => onRemove(item.id)}
            sx={{ color: 'error.main' }}
          >
            <Delete />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = total > 50 ? 0 : 5.99;
  const finalTotal = total + deliveryFee;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      navigate('/home');
    }, 2000);
  };

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
        </Typography>
      </Box>

      <AnimatePresence>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </AnimatePresence>

      <Card sx={{ mt: 3, borderRadius: 2, boxShadow: theme.shadows[2] }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Order Summary
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">Subtotal</Typography>
            <Typography>${total.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">Delivery Fee</Typography>
            <Typography>
              {deliveryFee === 0 ? (
                <Chip
                  label="FREE"
                  size="small"
                  color="success"
                  sx={{ fontWeight: 600 }}
                />
              ) : (
                `$${deliveryFee.toFixed(2)}`
              )}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Total
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              ${finalTotal.toFixed(2)}
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleCheckout}
            disabled={isCheckingOut}
            sx={{
              borderRadius: 2,
              py: 1.5,
              bgcolor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
                transform: 'scale(1.02)',
              },
              transition: 'all 0.2s',
            }}
          >
            {isCheckingOut ? 'Processing...' : 'Checkout'}
          </Button>
          {isCheckingOut && (
            <LinearProgress sx={{ mt: 2, borderRadius: 1 }} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Cart;
