import { Box, Typography, Card, CardMedia, CardContent, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import { recommendedItems } from '../../data/homeData';

const ItemCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  height: '100%',
}));

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const RecommendedItems = () => {
  return (
    <Box sx={{ mb: 3, px: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Recommended for You
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
        }}
        component={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {recommendedItems.map((item) => (
          <motion.div key={item.id} variants={item}>
            <ItemCard
              component={motion.div}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.name}
              />
              <CardContent sx={{ p: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {item.name}
                  </Typography>
                  <Chip
                    label={item.tag}
                    size="small"
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontSize: '0.7rem',
                      height: 20,
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {item.restaurant}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    ${item.price}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StarIcon sx={{ color: '#FFB800', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.rating}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </ItemCard>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default RecommendedItems;
