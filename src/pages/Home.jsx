import { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
  InputBase,
  useTheme,
  alpha,
  Chip,
} from '@mui/material';
import { Search, LocalDining, LocalPizza, Restaurant, Fastfood } from '@mui/icons-material';
import { motion } from 'framer-motion';
import FoodCard from '../components/food/FoodCard';

const featuredItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and extra virgin olive oil',
    price: 12.99,
    rating: 4.5,
    reviews: 128,
    image: '/images/pizza.jpg',
    preparationTime: 20,
    discount: 15,
  },
  {
    id: 2,
    name: 'Beef Burger',
    description: 'Premium beef patty with lettuce, tomato, cheese, and special sauce',
    price: 9.99,
    rating: 4.8,
    reviews: 256,
    image: '/images/burger.jpg',
    preparationTime: 15,
  },
  {
    id: 3,
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with pancetta, eggs, parmesan, and black pepper',
    price: 14.99,
    rating: 4.7,
    reviews: 189,
    image: '/images/pasta.jpg',
    preparationTime: 25,
    discount: 10,
  },
];

const categories = [
  {
    id: 1,
    name: 'All',
    icon: <LocalDining />,
    color: '#FF5252',
  },
  {
    id: 2,
    name: 'Pizza',
    icon: <LocalPizza />,
    color: '#FF9800',
  },
  {
    id: 3,
    name: 'Restaurant',
    icon: <Restaurant />,
    color: '#4CAF50',
  },
  {
    id: 4,
    name: 'Fast Food',
    icon: <Fastfood />,
    color: '#2196F3',
  },
];

const Home = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          What would you like
          <br /> to eat today?
        </Typography>

        <Card
          sx={{
            p: 1,
            display: 'flex',
            alignItems: 'center',
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            borderRadius: 2,
          }}
        >
          <IconButton>
            <Search />
          </IconButton>
          <InputBase
            placeholder="Search for food..."
            sx={{ ml: 1, flex: 1 }}
          />
        </Card>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Categories
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 2,
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                onClick={() => setSelectedCategory(category.name)}
                sx={{
                  minWidth: 100,
                  cursor: 'pointer',
                  bgcolor:
                    selectedCategory === category.name
                      ? alpha(category.color, 0.1)
                      : 'background.paper',
                  borderColor:
                    selectedCategory === category.name
                      ? category.color
                      : 'divider',
                  borderWidth: 1,
                  borderStyle: 'solid',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2,
                    '&:last-child': { pb: 2 },
                  }}
                >
                  <Box
                    sx={{
                      color: category.color,
                      mb: 1,
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography variant="body2" align="center">
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Featured Items
          </Typography>
          <Chip
            label="See All"
            onClick={() => {/* Navigate to menu */}}
            variant="outlined"
          />
        </Box>
        <Grid container spacing={3}>
          {featuredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <FoodCard food={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
