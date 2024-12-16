import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  Paper,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import LockIcon from '@mui/icons-material/Lock';
import PaymentIcon from '@mui/icons-material/Payment';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SettingSection = ({ title, children, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Button
        fullWidth
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          justifyContent: 'space-between',
          color: 'text.primary',
          p: 2,
          '&:hover': {
            bgcolor: 'background.default',
          },
        }}
        endIcon={
          <KeyboardArrowDownIcon
            sx={{
              transform: isExpanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s',
            }}
          />
        }
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Divider />
            <Box sx={{ p: 2 }}>{children}</Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Paper>
  );
};

const SettingItem = ({ icon, primary, secondary, action }) => (
  <ListItem
    component={motion.div}
    whileHover={{ x: 4 }}
    sx={{
      px: 2,
      py: 1.5,
      borderRadius: 2,
      '&:hover': {
        bgcolor: 'background.default',
      },
    }}
  >
    <Box
      sx={{
        mr: 2,
        display: 'flex',
        alignItems: 'center',
        color: 'primary.main',
      }}
    >
      {icon}
    </Box>
    <ListItemText
      primary={
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {primary}
        </Typography>
      }
      secondary={
        <Typography variant="body2" color="text.secondary">
          {secondary}
        </Typography>
      }
    />
    <ListItemSecondaryAction>{action}</ListItemSecondaryAction>
  </ListItem>
);

const Settings = () => {
  const [settings, setSettings] = useState({
    biometric: true,
    orderUpdates: true,
    deals: true,
    delivery: true,
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <SettingSection title="Account Settings">
        <List disablePadding>
          <SettingItem
            icon={<LockIcon />}
            primary="Change Password"
            secondary="Update your password regularly"
            action={
              <Button
                size="small"
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                Change
              </Button>
            }
          />
          <SettingItem
            icon={<PaymentIcon />}
            primary="Payment Methods"
            secondary="Add or remove payment options"
            action={
              <Button
                size="small"
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                Manage
              </Button>
            }
          />
        </List>
      </SettingSection>

      <SettingSection title="Privacy Settings">
        <List disablePadding>
          <SettingItem
            icon={<FingerprintIcon />}
            primary="Biometric Login"
            secondary="Enable fingerprint or face recognition"
            action={
              <Switch
                checked={settings.biometric}
                onChange={() => handleToggle('biometric')}
                color="primary"
              />
            }
          />
          <SettingItem
            icon={<SecurityIcon />}
            primary="Data Sharing"
            secondary="Manage how your data is used"
            action={
              <Button
                size="small"
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                Manage
              </Button>
            }
          />
        </List>
      </SettingSection>

      <SettingSection title="Notification Preferences">
        <List disablePadding>
          <SettingItem
            icon={<NotificationsIcon />}
            primary="Order Updates"
            secondary="Get notified about your order status"
            action={
              <Switch
                checked={settings.orderUpdates}
                onChange={() => handleToggle('orderUpdates')}
                color="primary"
              />
            }
          />
          <SettingItem
            icon={<NotificationsIcon />}
            primary="Deals & Offers"
            secondary="Receive notifications about special offers"
            action={
              <Switch
                checked={settings.deals}
                onChange={() => handleToggle('deals')}
                color="primary"
              />
            }
          />
          <SettingItem
            icon={<NotificationsIcon />}
            primary="Delivery Status"
            secondary="Track your delivery in real-time"
            action={
              <Switch
                checked={settings.delivery}
                onChange={() => handleToggle('delivery')}
                color="primary"
              />
            }
          />
        </List>
      </SettingSection>
    </Box>
  );
};

export default Settings;
