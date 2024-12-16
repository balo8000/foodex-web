import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { dealsNearby } from '../../data/homeData';

const DealsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(1.5),
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
  },
}));

const DealCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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

const DealsNearby = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ 
        px: 2, 
        mb: 1.5, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Deals Near You
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{ 
            fontWeight: 500, 
            cursor: 'pointer',
            fontSize: { xs: '0.8rem', sm: '0.875rem' }
          }}
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All
        </Typography>
      </Box>
      <DealsContainer
        component={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {dealsNearby.map((deal) => (
          <motion.div key={deal.id} variants={item}>
            <DealCard
              component={motion.div}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <CardContent sx={{ p: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar 
                    src={deal.logo} 
                    sx={{ 
                      width: 36, 
                      height: 36, 
                      mr: 1,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {deal.restaurant}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'primary.main',
                        bgcolor: 'primary.light',
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        fontWeight: 500,
                        fontSize: '0.7rem',
                        display: 'inline-block'
                      }}
                    >
                      {deal.discount}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                  >
                    {deal.deliveryTime}
                  </Typography>
                </Box>
              </CardContent>
            </DealCard>
          </motion.div>
        ))}
      </DealsContainer>
    </Box>
  );
};

export default DealsNearby;
