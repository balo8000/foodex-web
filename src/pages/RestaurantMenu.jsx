import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Divider,
  Drawer,
  Badge,
  Fab,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Rating,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon,
  Favorite,
  FavoriteBorder,
  AccessTime,
  LocalOffer,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavBar from '../components/navigation/TopNavBar';

const menuCategories = [
  {
    name: 'Popular',
    items: [
      {
        id: 1,
        name: 'Jollof Rice Special',
        description: 'Smoky and flavorful rice cooked in tomato sauce with special spices',
        price: 12.99,
        image: '/images/jollof-rice.jpg',
        rating: 4.8,
        spicy: true,
        popular: true,
      },
      {
        id: 2,
        name: 'Pounded Yam & Egusi',
        description: 'Smooth pounded yam served with rich egusi soup and assorted meat',
        price: 15.99,
        image: '/images/pounded-yam.jpg',
        rating: 4.9,
        popular: true,
      },
    ],
  },
  {
    name: 'Main Dishes',
    items: [
      {
        id: 3,
        name: 'Suya Platter',
        description: 'Grilled spiced meat served with onions and tomatoes',
        price: 18.99,
        image: '/images/suya.jpg',
        rating: 4.7,
        spicy: true,
      },
      {
        id: 4,
        name: 'Afang Soup Special',
        description: 'Traditional soup made with afang leaves and waterleaf',
        price: 16.99,
        image: '/images/afang-soup.jpg',
        rating: 4.6,
      },
    ],
  },
];

const MenuItem = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(prev => prev + 1);
    onAddToCart(item, quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
      onAddToCart(item, quantity - 1);
    }
  };

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        overflow: 'hidden',
        mb: 2,
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: '100%', sm: 140 },
          height: { xs: 140, sm: '100%' },
          objectFit: 'cover',
        }}
        image={item.image}
        alt={item.name}
      />
      <CardContent sx={{ flex: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {item.name}
              {item.spicy && (
                <Chip
                  label="Spicy"
                  size="small"
                  color="error"
                  sx={{ ml: 1, height: 20 }}
                />
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {item.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Rating value={item.rating} size="small" readOnly precision={0.1} />
              <Typography variant="body2" color="text.secondary">
                ({item.rating})
              </Typography>
            </Box>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              ${item.price}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              size="small" 
              onClick={handleRemove}
              disabled={quantity === 0}
              sx={{ 
                bgcolor: 'action.hover',
                '&:hover': { bgcolor: 'action.selected' },
              }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ minWidth: 20, textAlign: 'center' }}>
              {quantity}
            </Typography>
            <IconButton 
              size="small" 
              onClick={handleAdd}
              sx={{ 
                bgcolor: 'action.hover',
                '&:hover': { bgcolor: 'action.selected' },
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const CartDrawer = ({ open, onClose, cartItems, onUpdateQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } },
      }}
    >
      <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Your Cart
        </Typography>
        
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {cartItems.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{ width: 60, height: 60, borderRadius: 1, objectFit: 'cover' }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.price}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                    disabled={item.quantity === 0}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </Box>

        <Box sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6" color="primary">
              ${total.toFixed(2)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={onClose}
            sx={{ mb: 1 }}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

const RestaurantMenu = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = (item, quantity) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity }
            : i
        ).filter(i => i.quantity > 0);
      }
      if (quantity > 0) {
        return [...prev, { ...item, quantity }];
      }
      return prev;
    });
  };

  const handleUpdateCartQuantity = (item, quantity) => {
    handleAddToCart(item, quantity);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TopNavBar
        showBackButton
        title="Restaurant Menu"
        cartItemCount={totalItems}
      />
      
      <Box
        sx={{
          height: 200,
          position: 'relative',
          backgroundImage: 'url(/images/restaurant-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            color: 'white',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            African Kitchen
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Rating value={4.8} readOnly precision={0.1} />
            <Typography>(4.8)</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTime />
              <Typography>30-45 min</Typography>
            </Box>
          </Box>
        </Box>
        <IconButton
          onClick={() => setIsFavorite(!isFavorite)}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.2)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
          }}
        >
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Box>

      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: -5,
          mb: 8,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          {menuCategories.map((category) => (
            <Box key={category.name} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                {category.name}
              </Typography>
              <AnimatePresence>
                {category.items.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </AnimatePresence>
            </Box>
          ))}
        </Paper>
      </Container>

      {totalItems > 0 && (
        <Fab
          color="primary"
          aria-label="cart"
          onClick={() => setIsCartOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <Badge badgeContent={totalItems} color="error">
            <CartIcon />
          </Badge>
        </Fab>
      )}

      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
      />
    </Box>
  );
};

export default RestaurantMenu;
