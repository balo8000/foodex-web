import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // Implement logout logic here
    setOpen(false);
  };

  return (
    <>
      <Button
        component={motion.button}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        variant="contained"
        color="error"
        fullWidth
        startIcon={<LogoutIcon />}
        onClick={() => setOpen(true)}
        sx={{
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        Logout
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: '100%',
            maxWidth: 400,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            Are you sure you want to log out? You'll need to sign in again to
            access your account.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2 }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutButton;
