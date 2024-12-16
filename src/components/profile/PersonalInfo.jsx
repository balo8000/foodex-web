import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

const InfoItem = ({ label, value, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onEdit(editValue);
    setIsEditing(false);
  };

  return (
    <ListItem
      component={motion.div}
      layout
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 1,
        mb: 1,
        '&:last-child': { mb: 0 },
      }}
    >
      <AnimatePresence mode="wait">
        {isEditing ? (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            sx={{ width: '100%', display: 'flex', gap: 1 }}
          >
            <TextField
              fullWidth
              size="small"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              variant="outlined"
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleSave}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Box>
        ) : (
          <>
            <ListItemText
              primary={
                <Typography variant="body2" color="text.secondary">
                  {label}
                </Typography>
              }
              secondary={
                <Typography variant="body1" sx={{ mt: 0.5 }}>
                  {value}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                size="small"
                onClick={() => setIsEditing(true)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </>
        )}
      </AnimatePresence>
    </ListItem>
  );
};

const PersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState({
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    addresses: [
      '123 Main St, New York, NY 10001',
      '456 Park Ave, New York, NY 10002',
    ],
  });

  const handleEdit = (field, value) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'visible',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Personal Information
        </Typography>
        <List sx={{ p: 0 }}>
          <InfoItem
            label="Email"
            value={personalInfo.email}
            onEdit={(value) => handleEdit('email', value)}
          />
          <InfoItem
            label="Phone"
            value={personalInfo.phone}
            onEdit={(value) => handleEdit('phone', value)}
          />
        </List>

        <Typography variant="h6" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
          Delivery Addresses
        </Typography>
        <List sx={{ p: 0 }}>
          {personalInfo.addresses.map((address, index) => (
            <InfoItem
              key={index}
              label={`Address ${index + 1}`}
              value={address}
              onEdit={(value) =>
                handleEdit(
                  'addresses',
                  personalInfo.addresses.map((a, i) =>
                    i === index ? value : a
                  )
                )
              }
            />
          ))}
        </List>
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add New Address
        </Button>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
