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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ArrowBack, Add, Delete, CreditCard } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useUserData } from '../contexts/UserDataContext';

const PaymentMethods = () => {
  const navigate = useNavigate();
  const { paymentMethods, addPaymentMethod, removePaymentMethod } = useUserData();
  const [open, setOpen] = useState(false);
  const [newMethod, setNewMethod] = useState({
    type: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });

  const handleAdd = () => {
    // Mask the card number for security
    const maskedNumber = newMethod.cardNumber.slice(-4).padStart(16, '*');
    addPaymentMethod({
      ...newMethod,
      cardNumber: maskedNumber,
    });
    setNewMethod({
      type: 'credit',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: '',
    });
    setOpen(false);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Payment Methods
        </Typography>
      </Box>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card sx={{ mb: 2 }}>
          <List>
            {paymentMethods.map((method) => (
              <ListItem key={method.id}>
                <ListItemText
                  primary={`${method.type.toUpperCase()} Card - ${method.cardNumber}`}
                  secondary={`Expires: ${method.expiryDate}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => removePaymentMethod(method.id)}
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
          Add Payment Method
        </Button>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Card Type</InputLabel>
                <Select
                  value={newMethod.type}
                  onChange={(e) =>
                    setNewMethod({ ...newMethod, type: e.target.value })
                  }
                  label="Card Type"
                >
                  <MenuItem value="credit">Credit Card</MenuItem>
                  <MenuItem value="debit">Debit Card</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Card Number"
                value={newMethod.cardNumber}
                onChange={(e) =>
                  setNewMethod({ ...newMethod, cardNumber: e.target.value })
                }
                fullWidth
                inputProps={{ maxLength: 16 }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Expiry Date"
                  value={newMethod.expiryDate}
                  onChange={(e) =>
                    setNewMethod({ ...newMethod, expiryDate: e.target.value })
                  }
                  placeholder="MM/YY"
                  fullWidth
                />
                <TextField
                  label="CVV"
                  value={newMethod.cvv}
                  onChange={(e) =>
                    setNewMethod({ ...newMethod, cvv: e.target.value })
                  }
                  fullWidth
                  type="password"
                  inputProps={{ maxLength: 3 }}
                />
              </Box>
              <TextField
                label="Cardholder Name"
                value={newMethod.name}
                onChange={(e) =>
                  setNewMethod({ ...newMethod, name: e.target.value })
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

export default PaymentMethods;
