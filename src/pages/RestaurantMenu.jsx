import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  alpha,
  Paper,
  Container,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ArrowBack,
  Add,
  Remove,
  ShoppingCart,
  Search,
  Favorite,
  FavoriteBorder,
  FilterList,
  Restaurant,
  AccessTime,
  Star,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { menuItems, restaurantData, categories } from '../data/menuData';

const MenuItemCard = ({ item, onAddToCart, onToggleFavorite, isFavorite }) => {
  const [quantity, setQuantity] = useState(1);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [selectedCustomizations, setSelectedCustomizations] = useState([]);
  const theme = useTheme();
  const [isAdding, setIsAdding] = useState(false);

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleCustomizationChange = (customization) => {
    setSelectedCustomizations(prev => {
      const exists = prev.find(c => c.name === customization.name);
      if (exists) {
        return prev.filter(c => c.name !== customization.name);
      }
      return [...prev, customization];
    });
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    const itemToAdd = {
      ...item,
      quantity,
      selectedCustomizations,
      totalPrice: item.price * quantity + selectedCustomizations.reduce((sum, c) => sum + (c.price || 0), 0)
    };
    onAddToCart(itemToAdd);
    
    // Reset state
    setQuantity(1);
    setSelectedCustomizations([]);
    setIsCustomizing(false);
    
    // Reset animation state
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <>
      <Card
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'visible',
          bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.8) : '#fff',
          backdropFilter: 'blur(10px)',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        }}
        elevation={theme.palette.mode === 'dark' ? 2 : 1}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={item.image}
            alt={item.name}
            sx={{
              borderRadius: '16px 16px 0 0',
            }}
          />
          <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.8) : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              '&:hover': {
                bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.9) : 'rgba(255, 255, 255, 1)',
              },
            }}
            onClick={() => onToggleFavorite(item.id)}
          >
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Box>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>{item.name}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {item.tags?.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.primary.main, 0.2)
                    : theme.palette.primary.light,
                  color: theme.palette.mode === 'dark'
                    ? theme.palette.primary.light
                    : theme.palette.primary.main,
                }}
              />
            ))}
          </Box>
          <Box sx={{ mt: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" color="primary">
                ${item.price.toFixed(2)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleQuantityChange(-1)}
                  sx={{ bgcolor: theme.palette.action.hover }}
                >
                  <Remove />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton
                  size="small"
                  onClick={() => handleQuantityChange(1)}
                  sx={{ bgcolor: theme.palette.action.hover }}
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>
            <Button
              variant="contained"
              fullWidth
              onClick={() => item.customizations?.length ? setIsCustomizing(true) : handleAddToCart()}
              startIcon={<ShoppingCart />}
              disabled={isAdding}
              sx={{
                borderRadius: 2,
                py: 1,
                position: 'relative',
                overflow: 'hidden',
                '&::after': isAdding ? {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.2)}, transparent)`,
                  animation: 'shine 1s ease-in-out',
                } : {},
                '@keyframes shine': {
                  '0%': { transform: 'translateX(-100%)' },
                  '100%': { transform: 'translateX(100%)' },
                },
              }}
            >
              {isAdding ? 'Added!' : 'Add to Cart'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Customization Dialog */}
      <Dialog
        open={isCustomizing}
        onClose={() => setIsCustomizing(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Customize Your Order</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Select your preferences
          </Typography>
          <List>
            {item.customizations?.map((customization) => (
              <ListItem key={customization.name} disablePadding>
                <ListItemButton
                  onClick={() => handleCustomizationChange(customization)}
                  sx={{ borderRadius: 1 }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedCustomizations.some(c => c.name === customization.name)}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={customization.name}
                    secondary={customization.price ? `+$${customization.price.toFixed(2)}` : null}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCustomizing(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            startIcon={<ShoppingCart />}
          >
            Add to Cart (${((item.price * quantity) + selectedCustomizations.reduce((sum, c) => sum + (c.price || 0), 0)).toFixed(2)})
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const RestaurantMenu = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    let filtered = menuItems;

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (showFavoritesOnly) {
      filtered = filtered.filter(item => favorites.includes(item.id));
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory, favorites, showFavoritesOnly]);

  const handleToggleFavorite = (itemId) => {
    setFavorites(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  const handleAddToCart = (item) => {
    addItem({
      ...item,
      id: item.id || Math.random().toString(36).substr(2, 9),
      restaurant: restaurantData.name,
    });
    setSnackbar({
      open: true,
      message: `Added ${item.quantity}x ${item.name} to cart`,
      severity: 'success'
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pb: 10,
        bgcolor: theme.palette.mode === 'dark'
          ? theme.palette.background.default
          : alpha(theme.palette.primary.light, 0.1),
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ pt: 2, pb: 4 }}>
          {/* Header */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                bgcolor: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.common.white, 0.05)
                  : alpha(theme.palette.common.black, 0.05),
              }}
            >
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h5" fontWeight="bold">{restaurantData.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Restaurant fontSize="small" color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {restaurantData.cuisine}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTime fontSize="small" color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {restaurantData.deliveryTime}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Star fontSize="small" color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {restaurantData.rating} ({restaurantData.reviews})
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Search and Filters */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  bgcolor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.common.white, 0.05)
                    : theme.palette.common.white,
                },
              }}
            />

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <ToggleButtonGroup
                value={selectedCategory}
                exclusive
                onChange={(e, value) => value && setSelectedCategory(value)}
                size="small"
                sx={{
                  flexWrap: 'wrap',
                  '& .MuiToggleButton-root': {
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    borderColor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.common.white, 0.1)
                      : alpha(theme.palette.common.black, 0.1),
                    '&.Mui-selected': {
                      bgcolor: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.primary.main, 0.2)
                        : theme.palette.primary.light,
                      color: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <ToggleButton value="all">All</ToggleButton>
                {categories.map((category) => (
                  <ToggleButton key={category} value={category}>
                    {category}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>

              <ToggleButton
                value="favorites"
                selected={showFavoritesOnly}
                onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
                size="small"
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  borderColor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.common.white, 0.1)
                    : alpha(theme.palette.common.black, 0.1),
                  '&.Mui-selected': {
                    bgcolor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary.main, 0.2)
                      : theme.palette.primary.light,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <Favorite sx={{ mr: 1 }} /> Favorites
              </ToggleButton>
            </Box>
          </Box>

          {/* Menu Items Grid */}
          <AnimatePresence>
            {filteredItems.length === 0 ? (
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                sx={{
                  textAlign: 'center',
                  py: 8,
                }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No menu items found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search or filters
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filteredItems.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <MenuItemCard
                      item={item}
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={() => handleToggleFavorite(item.id)}
                      isFavorite={favorites.includes(item.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </AnimatePresence>
        </Box>
      </Container>
      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RestaurantMenu;
