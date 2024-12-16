import { useState } from 'react';
import { Box, Typography, IconButton, Avatar, Badge, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedIcon from '@mui/icons-material/Verified';

const ProfileAvatar = styled(motion(Avatar))(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    width: 100,
    height: 100,
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: 40,
    height: 40,
    borderRadius: '50%',
    right: 5,
    bottom: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
}));

const ProfileHeader = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        position: 'relative',
      }}
    >
      {/* Cover Image */}
      <Box
        sx={{
          height: 140,
          bgcolor: 'primary.light',
          backgroundImage: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("/path-to-pattern.png")', // Add a subtle pattern
            opacity: 0.1,
          },
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'background.paper' },
          }}
        >
          <CameraAltIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Profile Content */}
      <Box sx={{ px: 3, pb: 3, pt: 7, textAlign: 'center' }}>
        {/* Avatar */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 80,
          }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <IconButton
                size="small"
                sx={{
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'background.paper' },
                }}
              >
                <CameraAltIcon fontSize="small" />
              </IconButton>
            }
          >
            <ProfileAvatar
              src="/path-to-profile-image.jpg" // Replace with actual image path
              alt="Profile Picture"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </StyledBadge>
        </Box>

        {/* User Info */}
        <Box sx={{ mt: 2, position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              John Doe
            </Typography>
            <VerifiedIcon 
              sx={{ 
                ml: 1, 
                color: 'primary.main',
                fontSize: 20 
              }} 
            />
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: 'primary.main',
              fontWeight: 500,
              bgcolor: 'primary.light',
              px: 1.5,
              py: 0.5,
              borderRadius: 5,
              display: 'inline-block',
              mt: 0.5,
            }}
          >
            Foodie Expert
          </Typography>
          <IconButton
            size="small"
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Stats */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 4,
            mt: 2,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {[
            { label: 'Orders', value: '24' },
            { label: 'Reviews', value: '12' },
            { label: 'Points', value: '750' },
          ].map((stat) => (
            <Box key={stat.label} sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileHeader;
