import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Switch,
  Divider,
  useTheme,
  alpha,
  Badge,
} from '@mui/material';
import {
  Edit,
  Save,
  ArrowBack,
  LocationOn,
  CreditCard,
  History,
  Notifications,
  DarkMode,
  Help,
  ExitToApp,
  PhotoCamera,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { useUserData } from '../contexts/UserDataContext';

const ProfileSection = ({ title, children }) => (
  <Card sx={{ mb: 2, borderRadius: 2 }}>
    <CardContent>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>
      {children}
    </CardContent>
  </Card>
);

const Profile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, updatePreferences, logout } = useUser();
  const { updateProfileImage } = useUserData();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef();
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 234 567 890',
    darkMode: user?.preferences?.darkMode || false,
    notifications: user?.preferences?.notifications || true,
  });

  const handleSave = () => {
    updatePreferences({
      darkMode: profileData.darkMode,
      notifications: profileData.notifications,
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Your Profile
        </Typography>
      </Box>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card sx={{ mb: 3, borderRadius: 2, position: 'relative', overflow: 'visible' }}>
          <Box
            sx={{
              position: 'absolute',
              top: -30,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <IconButton
                  sx={{
                    bgcolor: 'background.paper',
                    boxShadow: theme.shadows[2],
                    '&:hover': { bgcolor: 'background.paper' },
                  }}
                  size="small"
                  onClick={() => fileInputRef.current.click()}
                >
                  <PhotoCamera fontSize="small" />
                </IconButton>
              }
            >
              <Avatar
                src={user?.avatar}
                sx={{
                  width: 80,
                  height: 80,
                  border: `4px solid ${theme.palette.background.paper}`,
                  boxShadow: theme.shadows[3],
                }}
              />
            </Badge>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </Box>

          <CardContent sx={{ pt: 6, textAlign: 'center' }}>
            <Box sx={{ mt: 2, mb: 3 }}>
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="standard"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  sx={{ mb: 1 }}
                />
              ) : (
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {profileData.name}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                Member since 2023
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              {isEditing ? (
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  sx={{ borderRadius: 2 }}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() => setIsEditing(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>

        <ProfileSection title="Personal Information">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              value={profileData.email}
              disabled={!isEditing}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Phone"
              value={profileData.phone}
              disabled={!isEditing}
              fullWidth
              variant="outlined"
            />
          </Box>
        </ProfileSection>

        <ProfileSection title="Settings">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DarkMode />
                <Typography>Dark Mode</Typography>
              </Box>
              <Switch
                checked={profileData.darkMode}
                onChange={(e) =>
                  setProfileData({ ...profileData, darkMode: e.target.checked })
                }
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Notifications />
                <Typography>Notifications</Typography>
              </Box>
              <Switch
                checked={profileData.notifications}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    notifications: e.target.checked,
                  })
                }
              />
            </Box>
          </Box>
        </ProfileSection>

        <ProfileSection title="Quick Actions">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              startIcon={<LocationOn />}
              sx={{ justifyContent: 'flex-start' }}
              onClick={() => navigate('/addresses')}
            >
              Manage Addresses
            </Button>
            <Button
              startIcon={<CreditCard />}
              sx={{ justifyContent: 'flex-start' }}
              onClick={() => navigate('/payment-methods')}
            >
              Payment Methods
            </Button>
            <Button
              startIcon={<History />}
              sx={{ justifyContent: 'flex-start' }}
              onClick={() => navigate('/order-history')}
            >
              Order History
            </Button>
            <Button
              startIcon={<Help />}
              sx={{ justifyContent: 'flex-start' }}
              onClick={() => navigate('/help')}
            >
              Help & Support
            </Button>
          </Box>
        </ProfileSection>

        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<ExitToApp />}
          onClick={handleLogout}
          sx={{
            mt: 2,
            mb: 4,
            borderRadius: 2,
            py: 1.5,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
            },
          }}
        >
          Logout
        </Button>
      </motion.div>
    </Box>
  );
};

export default Profile;
