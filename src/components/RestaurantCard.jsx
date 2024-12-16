import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Chip,
  Rating,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  AccessTime,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const RestaurantCard = ({ name, image, rating, cuisine, deliveryTime, offer, onFavorite, onOrder }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavorite && onFavorite(!isFavorite);
  };

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      elevation={1}
      sx={{
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 2,
        cursor: 'pointer',
      }}
      onClick={onOrder}
    >
      <Box sx={{ position: 'relative', paddingTop: '80%', width: '100%' }}>
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'background.paper' },
            padding: '4px',
          }}
          size="small"
        >
          {isFavorite ? (
            <Favorite sx={{ color: 'error.main', fontSize: '1.2rem' }} />
          ) : (
            <FavoriteBorder sx={{ fontSize: '1.2rem' }} />
          )}
        </IconButton>
        {offer && (
          <Chip
            label={offer}
            size="small"
            color="error"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              fontWeight: 'bold',
              fontSize: '0.7rem',
              height: 24,
            }}
          />
        )}
      </Box>

      <Box sx={{ p: 1.5, flexGrow: 1 }}>
        <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600, mb: 0.5 }}>
          {name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Rating value={rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {rating}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            {cuisine}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTime sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {deliveryTime}m
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default RestaurantCard;
