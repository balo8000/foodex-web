import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updatePreferences = (preferences) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev?.preferences,
        ...preferences
      }
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updatePreferences }}>
      {children}
    </UserContext.Provider>
  );
};
