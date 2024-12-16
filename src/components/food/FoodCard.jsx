import { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Rating,
  Chip,
  useTheme,
  alpha,
  Button,
  Collapse,
} from '@mui/material';
import {
  Add,
  Remove,
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Timer,
  LocalOffer,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';

const FoodCard = ({ food, variant = 'default' }) => {
  const theme = useTheme();
  const { addToCart, removeFromCart, cart } = useCart();
  const [favorite, setFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const cartItem = cart.find((item) => item.id === food.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      quantity: 1,
    });
  };

  const handleRemoveFromCart = () => {
    removeFromCart(food.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          height: variant === 'compact' ? '100%' : 'auto',
          display: 'flex',
          flexDirection: variant === 'compact' ? 'row' : 'column',
          position: 'relative',
          overflow: 'visible',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
            transition: 'all 0.3s ease-in-out',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: variant === 'compact' ? 120 : '100%',
            height: variant === 'compact' ? 120 : 200,
          }}
        >
          <CardMedia
            component="img"
            image={food.image}
            alt={food.name}
            sx={{
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: alpha(theme.palette.background.paper, 0.9),
              '&:hover': {
                bgcolor: alpha(theme.palette.background.paper, 1),
              },
            }}
            onClick={() => setFavorite(!favorite)}
          >
            {favorite ? (
              <Favorite color="error" />
            ) : (
              <FavoriteBorder color="action" />
            )}
          </IconButton>
          {food.discount && (
            <Chip
              label={`${food.discount}% OFF`}
              color="error"
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
              }}
            />
          )}
        </Box>

        <CardContent
          sx={{
            flex: 1,
            p: variant === 'compact' ? 1 : 2,
          }}
        >
          <Typography
            variant={variant === 'compact' ? 'body1' : 'h6'}
            component="h2"
            fontWeight="bold"
            gutterBottom
          >
            {food.name}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1,
            }}
          >
            <Rating value={food.rating} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              ({food.reviews})
            </Typography>
          </Box>

          {variant !== 'compact' && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: expanded ? 'unset' : 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => setExpanded(!expanded)}
            >
              {food.description}
            </Typography>
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Box>
              <Typography
                variant={variant === 'compact' ? 'body1' : 'h6'}
                component="span"
                color="primary"
                fontWeight="bold"
              >
                ${food.price.toFixed(2)}
              </Typography>
              {food.discount && (
                <Typography
                  variant="body2"
                  component="span"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through', ml: 1 }}
                >
                  ${(food.price * (1 + food.discount / 100)).toFixed(2)}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {food.preparationTime && (
                <Chip
                  icon={<Timer fontSize="small" />}
                  label={`${food.preparationTime} min`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            {quantity > 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  borderRadius: 2,
                  p: 0.5,
                }}
              >
                <IconButton
                  size="small"
                  onClick={handleRemoveFromCart}
                  color="primary"
                >
                  <Remove fontSize="small" />
                </IconButton>
                <Typography variant="body1" fontWeight="medium">
                  {quantity}
                </Typography>
                <IconButton
                  size="small"
                  onClick={handleAddToCart}
                  color="primary"
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <Button
                variant="contained"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                fullWidth
                sx={{ borderRadius: 2 }}
              >
                Add to Cart
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FoodCard;
