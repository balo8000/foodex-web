import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { 
  LocalPizza, 
  Restaurant, 
  Fastfood, 
  LocalBar, 
  BakeryDining,
  LocalCafe,
  SetMeal,
  LunchDining 
} from '@mui/icons-material';

const CategoryScroll = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  '-ms-overflow-style': 'none',
}));

const CategoryItem = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  minWidth: '60px',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(0.5),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const categories = [
  { icon: <Restaurant />, name: 'All' },
  { icon: <LocalPizza />, name: 'Pizza' },
  { icon: <Fastfood />, name: 'Fast Food' },
  { icon: <LocalBar />, name: 'Drinks' },
  { icon: <BakeryDining />, name: 'Bakery' },
  { icon: <LocalCafe />, name: 'Cafe' },
  { icon: <SetMeal />, name: 'Seafood' },
  { icon: <LunchDining />, name: 'Burgers' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Categories = ({ onSelect }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          px: 2, 
          mb: 1.5, 
          fontWeight: 600,
          fontSize: { xs: '1.1rem', sm: '1.25rem' }
        }}
      >
        Categories
      </Typography>
      <CategoryScroll
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(category.name)}
          >
            <IconWrapper>
              {category.icon}
            </IconWrapper>
            <Typography 
              variant="caption" 
              sx={{ 
                fontWeight: 500,
                fontSize: '0.7rem',
                textAlign: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              {category.name}
            </Typography>
          </CategoryItem>
        ))}
      </CategoryScroll>
    </Box>
  );
};

export default Categories;
