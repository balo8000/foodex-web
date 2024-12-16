import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import RestaurantCard from '../components/RestaurantCard';

const restaurantsData = [
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

const Home = () => {
  const [restaurants, setRestaurants] = useState(restaurantsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || restaurant.cuisine === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [restaurants, searchQuery, selectedCategory]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleOrder = (restaurant) => {
    // Handle order
  };

  const handleFavorite = (restaurant, isFavorite) => {
    // Handle favorite
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        pb: 8,
        pt: { xs: 2, sm: 3 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600,
            mb: 2,
            px: 1,
          }}
        >
          What would you like to eat?
        </Typography>
        <SearchBar onSearch={handleSearch} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 1,
            px: 1,
            fontWeight: 500,
          }}
        >
          Categories
        </Typography>
        <Categories onSelect={handleCategorySelect} />
      </Box>

      <Box>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            px: 1,
            fontWeight: 500,
          }}
        >
          Popular Restaurants
        </Typography>
        <Grid container spacing={1.5}>
          {filteredRestaurants.map((restaurant, index) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
              <RestaurantCard
                {...restaurant}
                onFavorite={(isFavorite) => handleFavorite(restaurant, isFavorite)}
                onOrder={() => handleOrder(restaurant)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
