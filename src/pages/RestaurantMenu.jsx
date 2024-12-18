import { useState, useMemo, useCallback } from 'react';
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
  useMediaQuery,
  Skeleton,
} from '@mui/material';
import {
  AccessTime,
  LocalShipping as Delivery,
  Info,
  LocalOffer,
  Star,
  Favorite,
  FavoriteBorder,
  NavigateBefore,
  Search,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FoodCard from '../components/food/FoodCard';
import { useCart } from '../contexts/CartContext';

const menuCategories = [
  { id: 'all', label: 'All' },
  { id: 'starters', label: 'Starters' },
  { id: 'main', label: 'Main Course' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'sushi', label: 'Sushi' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
];

const menuItems = {
  starters: [
    {
      id: 's1',
      name: 'Spring Rolls',
      description: 'Crispy vegetable spring rolls with sweet chili sauce',
      price: 7.99,
      image: '/images/springrolls.jpg',
      rating: 4.5,
      reviews: 128,
      preparationTime: 10,
      cuisine: 'Asian'
    },
    {
      id: 's2',
      name: 'Bruschetta',
      description: 'Grilled bread with tomatoes, garlic, and fresh basil',
      price: 6.99,
      image: '/images/bruschetta.jpg',
      rating: 4.3,
      reviews: 95,
      preparationTime: 8,
      cuisine: 'Italian'
    }
  ],
  main: [
    {
      id: 'm1',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon with herbs and lemon butter sauce',
      price: 24.99,
      image: '/images/salmon.jpg',
      rating: 4.8,
      reviews: 256,
      preparationTime: 25,
      cuisine: 'International'
    },
    {
      id: 'm2',
      name: 'Butter Chicken',
      description: 'Tender chicken in a rich, creamy tomato sauce',
      price: 18.99,
      image: '/images/butterchicken.jpg',
      rating: 4.9,
      reviews: 320,
      preparationTime: 20,
      cuisine: 'Indian'
    }
  ],
  pizza: [
    {
      id: 'p1',
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
      price: 14.99,
      image: '/images/pizza.jpg',
      rating: 4.7,
      reviews: 189,
      preparationTime: 20,
      cuisine: 'Italian'
    },
    {
      id: 'p2',
      name: 'Pepperoni Pizza',
      description: 'Classic pepperoni with mozzarella and tomato sauce',
      price: 16.99,
      image: '/images/pepperoni.jpg',
      rating: 4.6,
      reviews: 210,
      preparationTime: 20,
      cuisine: 'Italian'
    }
  ],
  sushi: [
    {
      id: 'su1',
      name: 'Sushi Platter',
      description: 'Assorted fresh sushi rolls with wasabi and ginger',
      price: 26.99,
      image: '/images/sushi.jpg',
      rating: 4.8,
      reviews: 150,
      preparationTime: 25,
      cuisine: 'Japanese'
    },
    {
      id: 'su2',
      name: 'Dragon Roll',
      description: 'Eel and cucumber topped with avocado',
      price: 18.99,
      image: '/images/dragonroll.jpg',
      rating: 4.7,
      reviews: 130,
      preparationTime: 20,
      cuisine: 'Japanese'
    }
  ],
  desserts: [
    {
      id: 'd1',
      name: 'Tiramisu',
      description: 'Classic Italian coffee-flavored dessert',
      price: 8.99,
      image: '/images/tiramisu.jpg',
      rating: 4.9,
      reviews: 220,
      preparationTime: 10,
      cuisine: 'Italian'
    },
    {
      id: 'd2',
      name: 'Mochi Ice Cream',
      description: 'Assorted Japanese rice cake with ice cream filling',
      price: 7.99,
      image: '/images/mochi.jpg',
      rating: 4.6,
      reviews: 180,
      preparationTime: 5,
      cuisine: 'Japanese'
    }
  ],
  drinks: [
    {
      id: 'dr1',
      name: 'Green Tea',
      description: 'Traditional Japanese green tea',
      price: 3.99,
      image: '/images/greentea.jpg',
      rating: 4.5,
      reviews: 90,
      preparationTime: 5,
      cuisine: 'Japanese'
    },
    {
      id: 'dr2',
      name: 'Italian Soda',
      description: 'Assorted flavored Italian sodas',
      price: 4.99,
      image: '/images/italiansoda.jpg',
      rating: 4.4,
      reviews: 75,
      preparationTime: 5,
      cuisine: 'Italian'
    }
  ]
};

const RestaurantMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { cart } = useCart();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = useCallback((event, newValue) => {
    setActiveCategory(newValue);
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return Object.values(menuItems).flat();
    }
    return menuItems[activeCategory] || [];
  }, [activeCategory]);

  const restaurantInfo = {
    name: "Global Fusion Kitchen",
    rating: 4.8,
    reviews: 1250,
    deliveryTime: '30-45',
    deliveryFee: 2.99,
    minOrder: 15.00,
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            <NavigateBefore />
          </IconButton>
          <Typography variant="h5" component="h1" fontWeight="bold">
            {restaurantInfo.name}
          </Typography>
        </Box>

        <Card sx={{ mb: 2, p: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Star sx={{ color: theme.palette.warning.main, mr: 0.5 }} />
              <Typography variant="body1" fontWeight="medium">
                {restaurantInfo.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                ({restaurantInfo.reviews} reviews)
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTime sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                {restaurantInfo.deliveryTime} min
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Delivery sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                ${restaurantInfo.deliveryFee} Delivery
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Info sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                Min. ${restaurantInfo.minOrder}
              </Typography>
            </Box>
          </Box>
        </Card>

        <Box
          sx={{
            overflowX: 'auto',
            mb: 3,
            '::-webkit-scrollbar': {
              height: 6,
            },
            '::-webkit-scrollbar-track': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              borderRadius: 3,
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.primary.main,
              borderRadius: 3,
            },
          }}
        >
          <Tabs
            value={activeCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main,
              },
              minHeight: 48,
            }}
          >
            {menuCategories.map((category) => (
              <Tab
                key={category.id}
                label={category.label}
                value={category.id}
                sx={{
                  textTransform: 'none',
                  minWidth: 'auto',
                  px: 3,
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      <AnimatePresence mode="wait">
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 2,
            '::-webkit-scrollbar': {
              height: 6,
            },
            '::-webkit-scrollbar-track': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              borderRadius: 3,
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.primary.main,
              borderRadius: 3,
            },
          }}
        >
          {loading ? (
            Array.from(new Array(6)).map((_, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: 280,
                  flex: '0 0 auto',
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={300}
                  sx={{ borderRadius: 2 }}
                />
              </Box>
            ))
          ) : (
            filteredItems.map((item) => (
              <Box
                key={item.id}
                component={motion.div}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                sx={{
                  minWidth: 280,
                  flex: '0 0 auto',
                }}
              >
                <FoodCard food={item} />
              </Box>
            ))
          )}
        </Box>
      </AnimatePresence>
    </Container>
  );
};

export default RestaurantMenu;
