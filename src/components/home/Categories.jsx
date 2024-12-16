import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { categories } from '../../data/homeData';

const CategoryContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const CategoryItem = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
}));

const CategoryIcon = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: '20px',
  backgroundColor: theme.palette.grey[50],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '28px',
  marginBottom: theme.spacing(1),
  color: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    width: 56,
    height: 56,
    fontSize: '24px',
  },
}));

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const Categories = () => {
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
      <CategoryContainer
        component={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.slice(0, 8).map((category) => (
          <CategoryItem 
            key={category.id} 
            variants={item}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <CategoryIcon
              component={motion.div}
              initial={{ rotate: -5 }}
              whileHover={{ 
                rotate: 0,
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              {category.icon}
            </CategoryIcon>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 500,
                textAlign: 'center',
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: 'text.secondary'
              }}
            >
              {category.name}
            </Typography>
          </CategoryItem>
        ))}
      </CategoryContainer>
    </Box>
  );
};

export default Categories;
