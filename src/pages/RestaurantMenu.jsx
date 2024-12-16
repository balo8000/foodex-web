import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardMedia,
  Rating,
  Chip,
  useTheme,
  alpha,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import {
  AccessTime,
  Delivery,
  Info,
  LocalOffer,
  Star,
  Favorite,
  FavoriteBorder,
  NavigateBefore,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FoodCard from '../components/food/FoodCard';

const menuCategories = [
  { id: 'all', label: 'All' },
  { id: 'starters', label: 'Starters' },
  { id: 'main', label: 'Main Course' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
];

const menuItems = {
  starters: [
    {
      id: 's1',
      name: 'Bruschetta',
      description: 'Grilled bread rubbed with garlic and topped with tomatoes, olive oil, salt and pepper',
      price: 7.99,
      image: '/images/bruschetta.jpg',
      rating: 4.5,
      reviews: 86,
      preparationTime: 10,
    },
    {
      id: 's2',
      name: 'Caprese Salad',
      description: 'Fresh mozzarella, tomatoes, and sweet basil leaves seasoned with salt and olive oil',
      price: 8.99,
      image: '/images/caprese.jpg',
      rating: 4.3,
      reviews: 64,
      preparationTime: 8,
    },
  ],
  main: [
    {
      id: 'm1',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon fillet grilled to perfection with herbs and lemon',
      price: 24.99,
      image: '/images/salmon.jpg',
      rating: 4.8,
      reviews: 142,
      preparationTime: 25,
      discount: 10,
    },
    {
      id: 'm2',
      name: 'Beef Steak',
      description: 'Premium cut beef steak cooked to your preference with seasonal vegetables',
      price: 29.99,
      image: '/images/steak.jpg',
      rating: 4.9,
      reviews: 186,
      preparationTime: 30,
    },
  ],
  pizza: [
    {
      id: 'p1',
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella, basil, and extra virgin olive oil',
      price: 12.99,
      image: '/images/pizza.jpg',
      rating: 4.5,
      reviews: 128,
      preparationTime: 20,
      discount: 15,
    },
  ],
  pasta: [
    {
      id: 'pa1',
      name: 'Pasta Carbonara',
      description: 'Creamy pasta with pancetta, eggs, parmesan, and black pepper',
      price: 14.99,
      image: '/images/pasta.jpg',
      rating: 4.7,
      reviews: 189,
      preparationTime: 25,
    },
  ],
  desserts: [
    {
      id: 'd1',
      name: 'Tiramisu',
      description: 'Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream',
      price: 8.99,
      image: '/images/tiramisu.jpg',
      rating: 4.6,
      reviews: 94,
      preparationTime: 10,
    },
  ],
  drinks: [
    {
      id: 'dr1',
      name: 'Italian Wine',
      description: 'Premium Italian red wine, perfect complement to your meal',
      price: 19.99,
      image: '/images/wine.jpg',
      rating: 4.4,
      reviews: 56,
    },
  ],
};

const RestaurantMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorite, setFavorite] = useState(false);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const getAllItems = () => {
    if (selectedCategory === 'all') {
      return Object.values(menuItems).flat();
    }
    return menuItems[selectedCategory] || [];
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Restaurant Header */}
      <Box
        sx={{
          position: 'relative',
          height: 240,
          overflow: 'hidden',
        }}
      >
        <CardMedia
          component="img"
          image="/images/restaurant-cover.jpg"
          alt="Restaurant"
          sx={{
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
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton
              onClick={() => navigate(-1)}
              sx={{ color: 'white' }}
            >
              <NavigateBefore />
            </IconButton>
            <IconButton
              onClick={() => setFavorite(!favorite)}
              sx={{ color: 'white' }}
            >
              {favorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
          <Box>
            <Typography variant="h4" color="white" fontWeight="bold">
              Italian Restaurant
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Chip
                icon={<Star sx={{ color: '#FFD700 !important' }} />}
                label="4.8 (2.5k+ reviews)"
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}
              />
              <Chip
                icon={<AccessTime sx={{ color: 'white !important' }} />}
                label="30-45 min"
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}
              />
              <Chip
                icon={<Delivery sx={{ color: 'white !important' }} />}
                label="Free Delivery"
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Restaurant Info */}
      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative' }}>
        <Card sx={{ mb: 3, p: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Info color="primary" />
            <Typography variant="body1">
              Welcome to our authentic Italian restaurant where we serve the finest
              dishes made with fresh ingredients imported directly from Italy.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <LocalOffer color="error" />
            <Typography variant="body1" color="error.main">
              20% off on all main course dishes | Use code: ITALIAN20
            </Typography>
          </Box>
        </Card>

        {/* Menu Categories */}
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 3,
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          {menuCategories.map((category) => (
            <Tab
              key={category.id}
              value={category.id}
              label={category.label}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            />
          ))}
        </Tabs>

        {/* Menu Items */}
        <Grid container spacing={3}>
          {getAllItems().map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <FoodCard food={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default RestaurantMenu;
