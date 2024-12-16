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
    gap: theme.spacing(1.5),
    padding: theme.spacing(1),
  },
}));

const CategoryItem = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  position: 'relative',
  overflow: 'hidden',
}));

const CategoryIcon = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingTop: '75%',
  position: 'relative',
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '& .icon-overlay': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '24px',
    color: '#fff',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
    zIndex: 1,
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
        {categories.map((category) => (
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
              <img src={category.image} alt={category.name} />
              <span className="icon-overlay">{category.icon}</span>
            </CategoryIcon>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 500,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
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
