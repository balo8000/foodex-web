import { useState } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
      elevation={0}
    >
      <IconButton sx={{ p: '10px' }} aria-label="search">
        <Search />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for food or restaurants"
        value={query}
        onChange={handleChange}
      />
    </Paper>
  );
};

export default SearchBar;
