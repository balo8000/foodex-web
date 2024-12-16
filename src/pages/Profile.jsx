import { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  IconButton,
  Button,
  Divider,
  useTheme,
  alpha,
  Paper,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  TextField,
  Collapse,
} from '@mui/material';
import {
  DarkMode,
  Notifications,
  Language,
  Security,
  Help,
  ChevronRight,
  Edit,
  LocationOn,
  Phone,
  Email,
  ExpandLess,
  ExpandMore,
  Lock,
  VpnKey,
  QuestionAnswer,
  Translate,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';

const ProfileSection = ({ title, children }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 2,
        p: 2,
        borderRadius: 3,
        bgcolor: theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.2)
          : theme.palette.background.paper,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.mode === 'dark'
          ? alpha(theme.palette.divider, 0.1)
          : theme.palette.divider}`,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: theme.palette.mode === 'dark'
            ? theme.palette.primary.light
            : theme.palette.primary.main,
          fontWeight: 600,
          mb: 2,
        }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
];

const faqItems = [
  {
    question: 'How do I change my delivery address?',
    answer: 'You can update your delivery address in the Location settings section of your profile.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is confirmed, you can track it in real-time from the Orders section.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept credit/debit cards, PayPal, and mobile payment solutions like Apple Pay and Google Pay.',
  },
  {
    question: 'How do I contact customer support?',
    answer: 'You can reach our customer support team 24/7 through the Help section or by emailing support@foodex.com',
  },
];

const Profile = () => {
  const theme = useTheme();
  const { user, updateUser } = useUser();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [languageDialog, setLanguageDialog] = useState(false);
  const [securityDialog, setSecurityDialog] = useState(false);
  const [emailDialog, setEmailDialog] = useState(false);
  const [locationDialog, setLocationDialog] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [newEmail, setNewEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [address, setAddress] = useState(user.address || '');

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleLanguageChange = (language) => {
    updateUser({
      preferences: {
        ...user.preferences,
        language: language.code,
      }
    });
    setLanguageDialog(false);
    setSnackbar({
      open: true,
      message: 'Language updated successfully!',
      severity: 'success',
    });
  };

  const handleSecurityUpdate = () => {
    // In a real app, you would validate the current password
    // and make an API call to update the password
    if (newPassword.length < 6) {
      setSnackbar({
        open: true,
        message: 'Password must be at least 6 characters long',
        severity: 'error',
      });
      return;
    }
    setSecurityDialog(false);
    setCurrentPassword('');
    setNewPassword('');
    setSnackbar({
      open: true,
      message: 'Password updated successfully!',
      severity: 'success',
    });
  };

  const handleEmailUpdate = () => {
    // In a real app, you would validate the email
    // and make an API call to update it
    if (!newEmail.includes('@')) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid email address',
        severity: 'error',
      });
      return;
    }
    updateUser({ email: newEmail });
    setEmailDialog(false);
    setSnackbar({
      open: true,
      message: 'Email updated successfully!',
      severity: 'success',
    });
  };

  const handleLocationUpdate = () => {
    updateUser({ address });
    setLocationDialog(false);
    setSnackbar({
      open: true,
      message: 'Address updated successfully!',
      severity: 'success',
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          updateUser({ profilePicture: e.target.result });
          setSnackbar({
            open: true,
            message: 'Profile picture updated successfully!',
            severity: 'success',
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to update profile picture',
          severity: 'error',
        });
      }
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.mode === 'dark'
          ? '#000'
          : theme.palette.grey[50],
        p: 2,
        pb: 10,
      }}
    >
      {/* Profile Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4,
          pt: 2,
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={user.profilePicture || '/avatar-placeholder.jpg'}
            alt={user.name}
            sx={{
              width: 120,
              height: 120,
              border: `4px solid ${theme.palette.primary.main}`,
              boxShadow: theme.palette.mode === 'dark'
                ? `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`
                : 'none',
            }}
          />
          <input
            type="file"
            accept="image/*"
            id="profile-image-upload"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <label htmlFor="profile-image-upload">
            <IconButton
              component="span"
              sx={{
                position: 'absolute',
                right: -8,
                bottom: -8,
                bgcolor: theme.palette.primary.main,
                color: 'white',
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              <Edit />
            </IconButton>
          </label>
        </Box>
        <Typography
          variant="h5"
          sx={{
            mt: 2,
            fontWeight: 600,
            color: theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.main,
          }}
        >
          {user.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOn fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary">
              {user.address || 'Add your location'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Email fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Settings Sections */}
      <ProfileSection title="Settings">
        <List disablePadding>
          <ListItem
            button
            onClick={() => setLanguageDialog(true)}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <ListItemIcon>
              <Language color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Language"
              secondary={languages.find(l => l.code === user.preferences?.language)?.name || 'English'}
            />
            <ChevronRight color="action" />
          </ListItem>

          <ListItem
            button
            onClick={() => setSecurityDialog(true)}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <ListItemIcon>
              <Security color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Security"
              secondary="Password & authentication"
            />
            <ChevronRight color="action" />
          </ListItem>

          <ListItem
            button
            onClick={() => setEmailDialog(true)}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <ListItemIcon>
              <Email color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Email"
              secondary={user.email}
            />
            <ChevronRight color="action" />
          </ListItem>

          <ListItem
            button
            onClick={() => setLocationDialog(true)}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <ListItemIcon>
              <LocationOn color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Location"
              secondary={user.address || 'Set your address'}
            />
            <ChevronRight color="action" />
          </ListItem>
        </List>
      </ProfileSection>

      {/* FAQ Section */}
      <ProfileSection title="FAQ">
        <List disablePadding>
          {faqItems.map((item, index) => (
            <Box key={index}>
              <ListItem
                button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <ListItemIcon>
                  <QuestionAnswer color="primary" />
                </ListItemIcon>
                <ListItemText primary={item.question} />
                {expandedFaq === index ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={expandedFaq === index} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    p: 2,
                    ml: 7,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {item.answer}
                  </Typography>
                </Box>
              </Collapse>
            </Box>
          ))}
        </List>
      </ProfileSection>

      {/* Dialogs */}
      <Dialog open={languageDialog} onClose={() => setLanguageDialog(false)}>
        <DialogTitle>Select Language</DialogTitle>
        <DialogContent>
          <List>
            {languages.map((language) => (
              <ListItem
                button
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                selected={user.preferences?.language === language.code}
              >
                <ListItemIcon>
                  <Translate />
                </ListItemIcon>
                <ListItemText primary={language.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      <Dialog open={securityDialog} onClose={() => setSecurityDialog(false)}>
        <DialogTitle>Security Settings</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="password"
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSecurityDialog(false)}>Cancel</Button>
          <Button onClick={handleSecurityUpdate} variant="contained" color="primary">
            Update Password
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={emailDialog} onClose={() => setEmailDialog(false)}>
        <DialogTitle>Update Email</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="email"
            label="New Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailDialog(false)}>Cancel</Button>
          <Button onClick={handleEmailUpdate} variant="contained" color="primary">
            Update Email
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={locationDialog} onClose={() => setLocationDialog(false)}>
        <DialogTitle>Update Location</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLocationDialog(false)}>Cancel</Button>
          <Button onClick={handleLocationUpdate} variant="contained" color="primary">
            Update Address
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
