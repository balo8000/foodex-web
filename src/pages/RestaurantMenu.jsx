import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Chip,
  Rating,
  Tabs,
  Tab,
  Badge,
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Share,
  ShoppingCart,
  Add,
  Remove,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const menuCategories = ['Popular', 'Starters', 'Main Course', 'Desserts', 'Drinks'];

const menuItems = [
  {
    id: 1,
    name: 'Jollof Rice Special',
    description: 'Spicy rice cooked in tomato sauce with mixed vegetables',
    price: 12.99,
    image: '/images/jollof-rice.jpg',
    category: 'Popular',
    rating: 4.8,
    spicy: true,
  },
  {
    id: 2,
    name: 'Suya Platter',
    description: 'Grilled spiced meat skewers with onions and tomatoes',
    price: 15.99,
    image: '/images/suya.jpg',
    category: 'Main Course',
    rating: 4.9,
    spicy: true,
  },
  // Add more menu items...
];

const MenuItem = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);
  
  const handleAdd = (e) => {
    e.stopPropagation();
    setQuantity(prev => {
      const newQuantity = prev + 1;
      onAddToCart(item, newQuantity);
      return newQuantity;
    });
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setQuantity(prev => {
      const newQuantity = Math.max(0, prev - 1);
      onAddToCart(item, newQuantity);
      return newQuantity;
    });
  };

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      elevation={1}
      sx={{
        display: 'flex',
        p: 1,
        gap: 1.5,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: 1,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={item.image}
          alt={item.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
            {item.name}
          </Typography>
          {item.spicy && (
            <Chip
              label="Spicy"
              size="small"
              color="error"
              sx={{ height: 20, fontSize: '0.7rem' }}
            />
          )}
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 0.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '0.8rem',
          }}
        >
          {item.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            ${item.price}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {quantity > 0 && (
              <>
                <IconButton
                  size="small"
                  onClick={handleRemove}
                  sx={{ p: 0.5 }}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>
                  {quantity}
                </Typography>
              </>
            )}
            <IconButton
              size="small"
              color="primary"
              onClick={handleAdd}
              sx={{ p: 0.5 }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

const CartDrawer = ({ open, onClose, cartItems, onUpdateQuantity }) => {
  const theme = useTheme();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          maxHeight: '80vh',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          pb: 2,
        },
      }}
    >
      <Box sx={{ p: 2, pb: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Your Cart</Typography>
        {cartItems.length === 0 ? (
          <Typography color="text.secondary">Your cart is empty</Typography>
        ) : (
          <>
            <List sx={{ mb: 2 }}>
              {cartItems.map((item) => (
                <ListItem key={item.id} sx={{ px: 0 }}>
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price} × ${item.quantity}`}
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="subtitle1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={onClose}
              sx={{ borderRadius: 2 }}
            >
              Checkout
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
};

const RestaurantMenu = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item, quantity) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return quantity === 0
          ? prev.filter(i => i.id !== item.id)
          : prev.map(i => i.id === item.id ? { ...i, quantity } : i);
      }
      return quantity > 0 ? [...prev, { ...item, quantity }] : prev;
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filteredItems = menuItems.filter(
    item => menuCategories[activeTab] === 'Popular' || item.category === menuCategories[activeTab]
  );

  return (
    <Box sx={{ pb: 8 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          bgcolor: 'background.paper',
          borderRadius: 0,
        }}
      >
        <Box
          sx={{
            height: 200,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.3)',
              zIndex: 1,
            },
          }}
        >
          <Box
            component="img"
            src="/images/restaurant-banner.jpg"
            alt="Restaurant"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              p: 2,
              zIndex: 2,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <IconButton
              onClick={() => navigate(-1)}
              sx={{ color: 'white' }}
            >
              <ArrowBack />
            </IconButton>
            <Box>
              <IconButton
                onClick={() => setIsFavorite(!isFavorite)}
                sx={{ color: 'white' }}
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <Share />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
            African Delights Restaurant
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Rating value={4.5} precision={0.5} size="small" readOnly />
            <Typography variant="body2" color="text.secondary">
              4.5 (500+ ratings)
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            African • 20-30 min • $5 delivery
          </Typography>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: 2,
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          {menuCategories.map((category, index) => (
            <Tab
              key={category}
              label={category}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.9rem',
                minWidth: 'auto',
                px: 2,
              }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Menu Items */}
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <AnimatePresence mode="wait">
          <Box
            component={motion.div}
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
          >
            {filteredItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </Box>
        </AnimatePresence>
      </Container>

      {/* Cart FAB */}
      <Fab
        color="primary"
        onClick={() => setCartOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1200,
        }}
      >
        <Badge badgeContent={totalItems} color="error">
          <ShoppingCart />
        </Badge>
      </Fab>

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleAddToCart}
      />
    </Box>
  );
};

export default RestaurantMenu;
