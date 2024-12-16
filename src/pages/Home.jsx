import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
  IconButton,
} from '@mui/material';
import { LocationOn, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import Categories from '../components/home/Categories';
import RestaurantCard from '../components/RestaurantCard';
import TopNavBar from '../components/navigation/TopNavBar';
import { useCart } from '../contexts/CartContext';

const restaurantsData = [
  {
    id: 1,
    name: 'Jollof House',
    image: '/images/jollof-rice.jpg',
    rating: 4.8,
    cuisine: 'West African • Rice • Local',
    deliveryTime: 30,
    offer: '15% OFF',
  },
  {
    id: 2,
    name: 'Pounded Yam Paradise',
    image: '/images/pounded-yam.jpg',
    rating: 4.9,
    cuisine: 'Nigerian • Traditional • Soup',
    deliveryTime: 35,
    offer: 'Free Soup Extra',
  },
  {
    id: 3,
    name: 'Suya Spot',
    image: '/images/suya.jpg',
    rating: 4.7,
    cuisine: 'African • Grills • Spicy',
    deliveryTime: 25,
  },
  {
    id: 4,
    name: 'Egusi Kitchen',
    image: '/images/egusi-soup.jpg',
    rating: 4.6,
    cuisine: 'Nigerian • Soups • Traditional',
    deliveryTime: 40,
    offer: 'Buy 1 Get 1 Free Swallow',
  },
];

const featuredLocations = [
  { name: 'Manhattan', count: 150 },
  { name: 'Brooklyn', count: 120 },
  { name: 'Queens', count: 90 },
  { name: 'Bronx', count: 70 },
];

const Home = () => {
  const theme = useTheme();
  const { cartItems } = useCart();
  const [restaurants, setRestaurants] = useState(restaurantsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || restaurant.cuisine.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [restaurants, searchQuery, selectedCategory]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TopNavBar cartItemCount={cartItems.length} />
      
      <Container 
        maxWidth="lg" 
        sx={{ 
          pt: { xs: 8, sm: 9 },
          pb: 8,
          px: { xs: 1, sm: 2 },
        }}
      >
        {/* Hero Section */}
        <Box 
          sx={{ 
            mb: 4,
            mt: 2,
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: { xs: '150px', sm: '200px' },
              height: '100%',
              backgroundImage: 'url(/images/hero-pattern.png)',
              backgroundSize: 'cover',
              opacity: 0.1,
            }}
          />
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: '1.75rem', sm: '2.5rem' },
            }}
          >
            Hungry?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 400,
              mb: 2,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            Order food from your favorite restaurants
          </Typography>
          <SearchBar onSearch={handleSearch} />
        </Box>

        {/* Categories Section */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              px: 1,
              fontWeight: 600,
            }}
          >
            Categories
          </Typography>
          <Categories onSelect={handleCategorySelect} />
        </Box>

        {/* Featured Locations */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              px: 1,
              fontWeight: 600,
            }}
          >
            Popular Locations
          </Typography>
          <Grid container spacing={2}>
            {featuredLocations.map((location, index) => (
              <Grid item xs={6} sm={3} key={location.name}>
                <Paper
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <LocationOn color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {location.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {location.count}+ Places
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Restaurants Section */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, px: 1 }} >
            <Typography 
              variant="h6" 
              sx={{ fontWeight: 600 }}
            >
              Popular Restaurants
            </Typography>
            <IconButton color="primary">
              <ArrowForward />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            {filteredRestaurants.map((restaurant, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3} 
                key={index}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RestaurantCard {...restaurant} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
