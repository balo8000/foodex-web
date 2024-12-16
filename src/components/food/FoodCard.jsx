import { useState, useCallback } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';

const FoodCard = ({ food, variant = 'default' }) => {
  const theme = useTheme();
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const [favorite, setFavorite] = useState(false);
  const quantity = getItemQuantity(food.id);

  const handleAddToCart = useCallback(() => {
    addToCart(food);
  }, [addToCart, food]);

  const handleRemoveFromCart = useCallback(() => {
    removeFromCart(food.id);
  }, [removeFromCart, food.id]);

  const handleFavoriteClick = useCallback(() => {
    setFavorite((prev) => !prev);
  }, []);

  return (
    <Card
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'visible',
        borderRadius: 2,
        boxShadow: theme.shadows[2],
      }}
    >
      {food.discount && (
        <Chip
          icon={<LocalOffer />}
          label={`${food.discount}% OFF`}
          color="error"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        />
      )}

      <IconButton
        onClick={handleFavoriteClick}
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          zIndex: 1,
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          '&:hover': {
            bgcolor: alpha(theme.palette.background.paper, 0.9),
          },
        }}
      >
        {favorite ? (
          <Favorite color="error" />
        ) : (
          <FavoriteBorder color="action" />
        )}
      </IconButton>

      <CardMedia
        component="img"
        image={food.image}
        alt={food.name}
        sx={{
          height: variant === 'compact' ? 120 : 180,
          objectFit: 'cover',
        }}
      />

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="h6" gutterBottom>
          {food.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1,
          }}
        >
          {food.description}
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
            ({food.ratingCount})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Timer fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {food.prepTime} mins
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 2,
          }}
        >
          <Typography variant="h6" color="primary">
            ${food.price}
          </Typography>

          <AnimatePresence initial={false}>
            {quantity > 0 ? (
              <Box
                component={motion.div}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <IconButton
                  size="small"
                  onClick={handleRemoveFromCart}
                  sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <Typography variant="body1">{quantity}</Typography>
                <IconButton
                  size="small"
                  onClick={handleAddToCart}
                  sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <Button
                component={motion.button}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                variant="contained"
                size="small"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
              >
                Add
              </Button>
            )}
          </AnimatePresence>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
