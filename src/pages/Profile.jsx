import { useState } from 'react';
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
  Close,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';

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
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Guest User',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    darkMode: user?.preferences?.darkMode || false,
    notifications: user?.preferences?.notifications || true,
  });

  const handleSave = async () => {
    try {
      setError(null);
      await updatePreferences({
        darkMode: profileData.darkMode,
        notifications: profileData.notifications,
      });
      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update preferences. Please try again.');
    }
  };

  const handleLogout = () => {
    try {
      logout();
      navigate('/');
    } catch (err) {
      setError('Failed to logout. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Profile
        </Typography>
      </Box>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {error && (
          <Box sx={{ mb: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Typography color="error" sx={{ mb: 1 }}>
                {error}
              </Typography>
            </motion.div>
          </Box>
        )}

        {success && (
          <Box sx={{ mb: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Typography color="success.main" sx={{ mb: 1 }}>
                Profile updated successfully!
              </Typography>
            </motion.div>
          </Box>
        )}

        <Card sx={{ mb: 3, borderRadius: 2, position: 'relative', overflow: 'visible' }}>
          <Box
            sx={{
              position: 'absolute',
              top: -30,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
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
          </Box>
          <CardContent sx={{ pt: 6, pb: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              {isEditing ? (
                <TextField
                  fullWidth
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {profileData.name}
                </Typography>
              )}
              <Typography color="text.secondary" variant="body2">
                {profileData.email || 'No email provided'}
              </Typography>
            </Box>
          </CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              p: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            {isEditing ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                  startIcon={<Close />}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  startIcon={<Save />}
                >
                  Save
                </Button>
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={() => setIsEditing(true)}
                startIcon={<Edit />}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Card>

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
                  setProfileData({ ...profileData, notifications: e.target.checked })
                }
              />
            </Box>
          </Box>
        </ProfileSection>

        <ProfileSection title="Account">
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleLogout}
            startIcon={<ExitToApp />}
            sx={{ mt: 1 }}
          >
            Logout
          </Button>
        </ProfileSection>
      </motion.div>
    </Box>
  );
};

export default Profile;
