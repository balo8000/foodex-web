import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const Rewards = () => {
  const points = 750;
  const nextReward = 1000;
  const progress = (points / nextReward) * 100;

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        mb: 3,
        overflow: 'visible',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <StarIcon
            sx={{
              color: 'primary.main',
              fontSize: 28,
              mr: 1,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Your Rewards
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: 'primary.light',
            borderRadius: 2,
            p: 2,
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ color: 'primary.main', mb: 1 }}>
            {points}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            Points Balance
          </Typography>
          <Box sx={{ mb: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'background.paper',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                },
              }}
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {nextReward - points} points until your next reward
          </Typography>
        </Box>

        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Available Offers
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {[
            { discount: '10% Off', condition: 'on your next order' },
            { discount: 'Free Delivery', condition: 'on orders above $30' },
          ].map((offer, index) => (
            <Box
              key={index}
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <LocalOfferIcon
                sx={{ color: 'primary.main', fontSize: 24, mr: 2 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {offer.discount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {offer.condition}
                </Typography>
              </Box>
              <Button size="small" variant="outlined">
                Claim
              </Button>
            </Box>
          ))}
        </Box>

        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 3 }}
          onClick={() => {}}
        >
          View Rewards History
        </Button>
      </CardContent>
    </Card>
  );
};

export default Rewards;
