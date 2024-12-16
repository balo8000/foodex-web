import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { ArrowBack, Add, Delete, Edit } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useUserData } from '../contexts/UserDataContext';

const Addresses = () => {
  const navigate = useNavigate();
  const { addresses, addAddress, removeAddress } = useUserData();
  const [open, setOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleAdd = () => {
    addAddress(newAddress);
    setNewAddress({ name: '', street: '', city: '', state: '', zipCode: '' });
    setOpen(false);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Manage Addresses
        </Typography>
      </Box>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card sx={{ mb: 2 }}>
          <List>
            {addresses.map((address) => (
              <ListItem key={address.id}>
                <ListItemText
                  primary={address.name}
                  secondary={`${address.street}, ${address.city}, ${address.state} ${address.zipCode}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => removeAddress(address.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Card>

        <Button
          fullWidth
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          sx={{ borderRadius: 2 }}
        >
          Add New Address
        </Button>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Address</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Name"
                value={newAddress.name}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, name: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Street"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="State"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="ZIP Code"
                value={newAddress.zipCode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, zipCode: e.target.value })
                }
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Box>
  );
};

export default Addresses;
