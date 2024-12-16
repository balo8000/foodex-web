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
import { useCart } from '../context/CartContext';

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
          onClick={() => navigate('/menu')}
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        elevation={isHovered ? 4 : 1}
        sx={{ 
          mb: 2,
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'visible',
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.02),
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{item.name}</Typography>
              {item.restaurant && (
                <Typography variant="body2" color="text.secondary">
                  from {item.restaurant}
                </Typography>
              )}
            </Box>
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton 
                size="small" 
                onClick={() => onRemove(item.id)}
                sx={{
                  color: theme.palette.error.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                  }
                }}
              >
                <Delete />
              </IconButton>
            </motion.div>
          </Box>
          
          {item.selectedCustomizations?.length > 0 && (
            <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {item.selectedCustomizations.map((c, index) => (
                <Chip
                  key={index}
                  label={c.name}
                  size="small"
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                  }}
                />
              ))}
            </Box>
          )}

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mt: 2
          }}>
            <Typography 
              variant="h6" 
              color="primary"
              sx={{ 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              ${(item.price * item.quantity).toFixed(2)}
              {item.discount > 0 && (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    textDecoration: 'line-through',
                    color: 'text.secondary'
                  }}
                >
                  ${((item.price * item.quantity) / (1 - item.discount)).toFixed(2)}
                </Typography>
              )}
            </Typography>
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                borderRadius: 2,
                p: 0.5
              }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  size="small"
                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  sx={{ color: theme.palette.primary.main }}
                >
                  <Remove />
                </IconButton>
              </motion.div>
              <Typography 
                sx={{ 
                  mx: 2,
                  fontWeight: 600,
                  color: theme.palette.primary.main
                }}
              >
                {item.quantity}
              </Typography>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  size="small"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  sx={{ color: theme.palette.primary.main }}
                >
                  <Add />
                </IconButton>
              </motion.div>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const DeliveryProgress = ({ estimatedTime }) => {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Card sx={{ mb: 2, overflow: 'hidden' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccessTime sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h6">
            Estimated Delivery Time: {estimatedTime} min
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              bgcolor: theme.palette.primary.main,
            }
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">Order Confirmed</Typography>
          <Typography variant="body2" color="text.secondary">On the Way</Typography>
          <Typography variant="body2" color="text.secondary">Delivered</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { items, total, subtotal, tax, deliveryFee, updateQuantity, removeItem } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [showPromoDialog, setShowPromoDialog] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  const handleApplyPromo = () => {
    // Simulate promo code application
    if (promoCode.toLowerCase() === 'welcome') {
      setPromoApplied(true);
      setShowPromoDialog(false);
    }
  };

  return (
    <Box sx={{ pb: 8 }}>
      {/* Header */}
      <Box
        component={motion.div}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1,
          boxShadow: theme.shadows[2],
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`
          }}
        >
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
            Your Cart
          </Typography>
          <Badge badgeContent={items.length} color="primary">
            <ShoppingBasket />
          </Badge>
        </Box>
      </Box>

      {/* Cart Items */}
      <Box sx={{ p: 2 }}>
        <AnimatePresence>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </AnimatePresence>

        {/* Delivery Progress */}
        <DeliveryProgress estimatedTime={30} />

        {/* Promo Code */}
        <Button
          startIcon={<LocalOffer />}
          onClick={() => setShowPromoDialog(true)}
          sx={{ 
            mb: 2,
            color: promoApplied ? theme.palette.success.main : theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {promoApplied ? (
            <>
              <CheckCircle fontSize="small" />
              Promo Code Applied
            </>
          ) : (
            'Add Promo Code'
          )}
        </Button>

        {/* Order Summary */}
        <Card 
          elevation={3}
          sx={{ 
            mb: 2,
            bgcolor: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.primary.main, 0.1) 
              : alpha(theme.palette.primary.main, 0.05)
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Order Summary
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal</Typography>
              <Typography>${subtotal?.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography>Delivery Fee</Typography>
                <Tooltip title="Based on distance and order value">
                  <Info fontSize="small" sx={{ color: 'text.secondary' }} />
                </Tooltip>
              </Box>
              <Typography>${deliveryFee.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Tax</Typography>
              <Typography>${tax?.toFixed(2)}</Typography>
            </Box>
            {promoApplied && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, color: theme.palette.success.main }}>
                <Typography>Promo Discount</Typography>
                <Typography>-$5.00</Typography>
              </Box>
            )}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography 
                variant="h6" 
                color="primary"
                sx={{ fontWeight: 600 }}
              >
                ${(promoApplied ? total - 5 : total)?.toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Checkout Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => navigate('/checkout')}
            sx={{
              py: 2,
              bgcolor: theme.palette.primary.main,
              color: 'white',
              borderRadius: 2,
              fontWeight: 600,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            Proceed to Checkout
          </Button>
        </motion.div>
      </Box>

      {/* Promo Dialog */}
      <Dialog 
        open={showPromoDialog} 
        onClose={() => setShowPromoDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: '100%',
            maxWidth: 400,
          }
        }}
      >
        <DialogTitle>Enter Promo Code</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Promo Code"
            fullWidth
            variant="outlined"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try code "WELCOME" for $5 off your first order!
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setShowPromoDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleApplyPromo}
            variant="contained"
            disabled={!promoCode}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
