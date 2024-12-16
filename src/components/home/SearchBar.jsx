import { useState } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  useTheme,
  alpha,
  Popper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import {
  Search as SearchIcon,
  RestaurantMenu,
  TrendingUp,
  History,
  Clear,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const recentSearches = [
    'Pizza',
    'Sushi',
    'Burger',
    'Italian Restaurant',
  ];

  const trendingSearches = [
    'Healthy Bowl',
    'Vegan Options',
    'Mexican Food',
  ];

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setAnchorEl(event.currentTarget);
  };

  const handleClear = () => {
    setSearchValue('');
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl) && searchValue.length > 0;

  return (
    <Box sx={{ mb: 3, position: 'relative' }}>
      <Paper
        component={motion.div}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        elevation={0}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 3,
          bgcolor: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.8)
            : theme.palette.background.paper,
          border: `1px solid ${theme.palette.mode === 'dark'
            ? alpha(theme.palette.divider, 0.1)
            : theme.palette.divider}`,
          boxShadow: theme.palette.mode === 'dark'
            ? `0 4px 20px ${alpha(theme.palette.common.black, 0.2)}`
            : '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <IconButton sx={{ p: '10px' }}>
          <SearchIcon
            sx={{
              color: theme.palette.mode === 'dark'
                ? theme.palette.text.secondary
                : theme.palette.text.primary,
            }}
          />
        </IconButton>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: theme.palette.text.primary,
            '& input::placeholder': {
              color: theme.palette.text.secondary,
              opacity: 0.7,
            },
          }}
          placeholder="Search for restaurants, cuisines, or dishes..."
          value={searchValue}
          onChange={handleSearchChange}
        />
        {searchValue && (
          <IconButton sx={{ p: '10px' }} onClick={handleClear}>
            <Clear
              sx={{
                color: theme.palette.mode === 'dark'
                  ? theme.palette.text.secondary
                  : theme.palette.text.primary,
              }}
            />
          </IconButton>
        )}
      </Paper>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ width: anchorEl?.offsetWidth, zIndex: 1300 }}
      >
        <Paper
          sx={{
            mt: 1,
            borderRadius: 2,
            bgcolor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.95)
              : theme.palette.background.paper,
            boxShadow: theme.palette.mode === 'dark'
              ? `0 4px 20px ${alpha(theme.palette.common.black, 0.3)}`
              : '0 4px 20px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <List sx={{ py: 1 }}>
            {/* Trending Searches */}
            <ListItem sx={{ px: 2, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <TrendingUp
                  fontSize="small"
                  sx={{ color: theme.palette.primary.main }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.mode === 'dark'
                        ? theme.palette.text.secondary
                        : theme.palette.text.primary,
                      fontWeight: 600,
                    }}
                  >
                    Trending
                  </Typography>
                }
              />
            </ListItem>
            {trendingSearches.map((search) => (
              <ListItem
                key={search}
                button
                sx={{
                  px: 2,
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary.main, 0.1)
                      : theme.palette.primary.lighter,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <RestaurantMenu
                    fontSize="small"
                    sx={{ color: theme.palette.primary.main }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === 'dark'
                          ? theme.palette.text.primary
                          : theme.palette.text.primary,
                      }}
                    >
                      {search}
                    </Typography>
                  }
                />
              </ListItem>
            ))}

            {/* Recent Searches */}
            <ListItem sx={{ px: 2, py: 0.5, mt: 1 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <History
                  fontSize="small"
                  sx={{ color: theme.palette.primary.main }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.mode === 'dark'
                        ? theme.palette.text.secondary
                        : theme.palette.text.primary,
                      fontWeight: 600,
                    }}
                  >
                    Recent Searches
                  </Typography>
                }
              />
            </ListItem>
            {recentSearches.map((search) => (
              <ListItem
                key={search}
                button
                sx={{
                  px: 2,
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary.main, 0.1)
                      : theme.palette.primary.lighter,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <History
                    fontSize="small"
                    sx={{ color: theme.palette.text.secondary }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === 'dark'
                          ? theme.palette.text.primary
                          : theme.palette.text.primary,
                      }}
                    >
                      {search}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </Box>
  );
};

export default SearchBar;
