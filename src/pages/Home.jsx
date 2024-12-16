import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Paper,
  InputBase,
  Grid,
  Chip,
  Rating,
  Button,
  useTheme,
  alpha,
  Skeleton,
  Snackbar,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  LocationOn,
  Search,
  MyLocation,
  LocalOffer,
  Favorite,
  AccessTime,
  LocalShipping,
  KeyboardArrowDown,
  FavoriteBorder,
  ShoppingCart,
  Remove,
  Add,
  Check,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/home/TopBar';
import WelcomeHeader from '../components/home/WelcomeHeader';
import HeroCarousel from '../components/home/HeroCarousel';

const CategoryCard = ({ icon: Icon, label, color, onClick }) => {
  const theme = useTheme();
  return (
    <Paper
      component={motion.div}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: 3,
        cursor: 'pointer',
        textAlign: 'center',
        bgcolor: theme.palette.mode === 'dark'
          ? alpha(color, 0.1)
          : alpha(color, 0.05),
        border: `1px solid ${theme.palette.mode === 'dark'
          ? alpha(color, 0.2)
          : alpha(color, 0.1)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: theme.palette.mode === 'dark'
            ? alpha(color, 0.2)
            : alpha(color, 0.1),
        },
      }}
    >
      <Icon sx={{ fontSize: 40, color: color, mb: 1 }} />
      <Typography
        variant="subtitle1"
        sx={{
          color: theme.palette.mode === 'dark'
            ? theme.palette.common.white
            : theme.palette.text.primary,
          fontWeight: 600,
        }}
      >
        {label}
      </Typography>
    </Paper>
  );
};

const RestaurantCard = ({ name, image, rating, cuisine, deliveryTime, offer, onFavorite, onOrder }) => {
  const theme = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showQuantity, setShowQuantity] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavorite?.(!isFavorite);
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    onOrder?.(quantity);
    
    // Animated feedback
    setTimeout(() => {
      setIsAdding(false);
      setShowQuantity(false);
      setQuantity(1);
    }, 1000);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    setShowQuantity(prev => !prev);
  };

  return (
    <Paper
      component={motion.div}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isAdding) setShowQuantity(false);
      }}
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        cursor: 'pointer',
        bgcolor: theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.2)
          : theme.palette.background.paper,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.mode === 'dark'
          ? alpha(theme.palette.divider, 0.1)
          : alpha(theme.palette.divider, 0.1)}`,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          paddingTop: '56.25%',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {offer && (
          <Chip
            icon={<LocalOffer sx={{ fontSize: 16 }} />}
            label={offer}
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              fontWeight: 600,
            }}
          />
        )}
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'background.paper' },
          }}
        >
          {isFavorite ? (
            <Favorite sx={{ color: theme.palette.error.main }} />
          ) : (
            <FavoriteBorder sx={{ color: theme.palette.error.main }} />
          )}
        </IconButton>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            p: 2,
          }}
        >
          <Typography variant="h6" color="common.white" fontWeight={600}>
            {name}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={rating} readOnly size="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            ({rating})
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {cuisine}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {deliveryTime} min
            </Typography>
          </Box>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {showQuantity ? (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(-1);
                      }}
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                      }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography variant="body1" sx={{ minWidth: '20px', textAlign: 'center' }}>
                      {quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(1);
                      }}
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </motion.div>
                ) : null}
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Tooltip title={showQuantity ? "Add to cart" : "Select quantity"}>
                    <IconButton
                      color="primary"
                      onClick={showQuantity ? handleAddToCart : handleCartClick}
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.2),
                        },
                        position: 'relative',
                      }}
                    >
                      {isAdding ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check />
                        </motion.div>
                      ) : (
                        <ShoppingCart />
                      )}
                    </IconButton>
                  </Tooltip>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Paper>
  );
};

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleGetLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const data = await response.json();
            const address = data.address;
            const locationString = address.road 
              ? `${address.road}, ${address.city || address.town || address.village || ''}`
              : `${address.city || address.town || address.village || ''}`;
            setLocation(locationString);
            setShowLocationPrompt(false);
            showSnackbar('Location updated successfully', 'success');
          } catch (error) {
            console.error('Error fetching address:', error);
            showSnackbar('Error getting location', 'error');
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          showSnackbar('Error accessing location services', 'error');
          setIsLoading(false);
        }
      );
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    showSnackbar(`Selected category: ${category.label}`);
  };

  const handleFavorite = (restaurant, isFavorite) => {
    showSnackbar(
      isFavorite 
        ? `Added ${restaurant.name} to favorites`
        : `Removed ${restaurant.name} from favorites`,
      'success'
    );
  };

  const handleOrder = (restaurant, quantity) => {
    showSnackbar(`Added ${quantity} x ${restaurant.name} to cart`, 'success');
  };

  const categories = [
    { icon: LocalOffer, label: 'Offers', color: theme.palette.error.main },
    { icon: Favorite, label: 'Popular', color: theme.palette.primary.main },
    { icon: AccessTime, label: 'Fast Food', color: theme.palette.warning.main },
    { icon: LocalShipping, label: 'Pickup', color: theme.palette.success.main },
  ];

  const restaurants = [
    {
      name: 'Jollof House',
      image: '/images/jollof-rice.jpg',
      rating: 4.8,
      cuisine: 'West African • Rice • Local',
      deliveryTime: 30,
      offer: '15% OFF',
    },
    {
      name: 'Pounded Yam Paradise',
      image: '/images/pounded-yam.jpg',
      rating: 4.9,
      cuisine: 'Nigerian • Traditional • Soup',
      deliveryTime: 35,
      offer: 'Free Soup Extra',
    },
    {
      name: 'Suya Spot',
      image: '/images/suya.jpg',
      rating: 4.7,
      cuisine: 'African • Grills • Spicy',
      deliveryTime: 25,
    },
    {
      name: 'Egusi Kitchen',
      image: '/images/egusi-soup.jpg',
      rating: 4.6,
      cuisine: 'Nigerian • Soups • Traditional',
      deliveryTime: 40,
      offer: 'Buy 1 Get 1 Free Swallow',
    },
    {
      name: 'Mshikaki House',
      image: '/images/mshikaki.jpg',
      rating: 4.7,
      cuisine: 'East African • Grills • Street Food',
      deliveryTime: 30,
      offer: '2 Free Sides',
    },
    {
      name: 'Injera Express',
      image: '/images/injera.jpg',
      rating: 4.8,
      cuisine: 'Ethiopian • Traditional • Stews',
      deliveryTime: 35,
    },
  ];

  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
        pb: 7,
      }}
    >
      <TopBar />
      
      <Container maxWidth="lg" sx={{ pt: { xs: 9, sm: 10 } }}>
        <WelcomeHeader />
        
        {/* Location Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ mb: 3 }}
        >
          {showLocationPrompt ? (
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <Typography variant="body1" sx={{ mb: 2, color: 'text.primary' }}>
                Allow location access to find restaurants near you
              </Typography>
              <Button
                variant="contained"
                startIcon={<MyLocation />}
                onClick={handleGetLocation}
                disabled={isLoading}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  bgcolor: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
              >
                {isLoading ? 'Getting location...' : 'Use my current location'}
              </Button>
            </Paper>
          ) : (
            <Paper
              component={motion.div}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              sx={{
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.background.paper, 0.6)
                  : alpha(theme.palette.background.paper, 0.9),
                backdropFilter: 'blur(8px)',
                boxShadow: theme.shadows[1],
                '&:hover': {
                  boxShadow: theme.shadows[2],
                },
              }}
            >
              <LocationOn color="primary" sx={{ mr: 1 }} />
              <Typography
                variant="body1"
                sx={{
                  flex: 1,
                  color: 'text.primary',
                  fontWeight: 500,
                }}
              >
                {isLoading ? (
                  <Skeleton width="60%" />
                ) : (
                  location || 'Location not available'
                )}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setShowLocationPrompt(true)}
                sx={{ color: 'primary.main' }}
              >
                <KeyboardArrowDown />
              </IconButton>
            </Paper>
          )}
        </Box>

        {/* Search Bar */}
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 2,
            mb: 3,
            bgcolor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.6)
              : alpha(theme.palette.background.paper, 0.9),
            backdropFilter: 'blur(8px)',
            boxShadow: theme.shadows[1],
            '&:hover': {
              boxShadow: theme.shadows[2],
            },
          }}
        >
          <IconButton sx={{ p: '10px', color: 'primary.main' }}>
            <Search />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for restaurants or dishes"
            inputProps={{ 'aria-label': 'search restaurants' }}
            value={searchQuery}
            onChange={handleSearch}
          />
        </Paper>

        <HeroCarousel />

        {/* Categories */}
        <Box sx={{ mt: 4, mb: 6 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            }}
          >
            Categories
          </Typography>
          <Grid container spacing={2}>
            {categories.map((category, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <CategoryCard 
                  {...category} 
                  onClick={() => handleCategoryClick(category)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Popular African Restaurants */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            Popular African Restaurants
            <Chip
              label="Local Favorites"
              size="small"
              color="primary"
              sx={{
                fontWeight: 500,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            />
          </Typography>
          <Grid container spacing={3}>
            <AnimatePresence>
              {filteredRestaurants.map((restaurant, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <RestaurantCard
                    {...restaurant}
                    onFavorite={(isFavorite) => handleFavorite(restaurant, isFavorite)}
                    onOrder={(quantity) => handleOrder(restaurant, quantity)}
                  />
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
