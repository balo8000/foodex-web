import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const { animation, direction } = location.state || { animation: 'fade', direction: 'right' };

  const variants = {
    slide: {
      initial: {
        x: direction === 'right' ? -300 : 300,
        opacity: 0
      },
      animate: {
        x: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }
      },
      exit: {
        x: direction === 'right' ? 300 : -300,
        opacity: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }
      }
    },
    fade: {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1,
        transition: {
          duration: 0.3
        }
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.3
        }
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={variants[animation].initial}
        animate={variants[animation].animate}
        exit={variants[animation].exit}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
