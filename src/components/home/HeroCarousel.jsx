import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { carouselData } from '../../data/homeData';

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 200,
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
  margin: theme.spacing(0, 2),
}));

const CarouselImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const CarouselContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
  color: 'white',
}));

const DotIndicator = styled(Box)(({ active }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: active ? '#FF4B3A' : '#E0E0E0',
  margin: '0 4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
}));

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ mb: 3 }}>
      <CarouselContainer>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CarouselImage src={carouselData[currentIndex].image} alt={carouselData[currentIndex].title} />
            <CarouselContent>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                {carouselData[currentIndex].title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {carouselData[currentIndex].description}
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                {carouselData[currentIndex].buttonText}
              </Button>
            </CarouselContent>
          </motion.div>
        </AnimatePresence>
      </CarouselContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        {carouselData.map((_, index) => (
          <DotIndicator
            key={index}
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
            component={motion.div}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroCarousel;
