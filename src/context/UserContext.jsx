import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      name: 'John Doe',
      email: 'john@example.com',
      profilePicture: null,
      address: '',
      preferences: {
        notifications: true,
        darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
        language: 'en',
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const updateUser = (updates) => {
    setUser(prev => {
      const newUser = {
        ...prev,
        ...updates,
        preferences: {
          ...prev.preferences,
          ...(updates.preferences || {})
        }
      };
      return newUser;
    });
  };

  const updateProfilePicture = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file provided'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        setUser(prev => ({
          ...prev,
          profilePicture: imageDataUrl
        }));
        resolve(imageDataUrl);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  };

  const toggleDarkMode = () => {
    updateUser({
      preferences: {
        ...user.preferences,
        darkMode: !user.preferences.darkMode
      }
    });
  };

  const toggleNotifications = () => {
    updateUser({
      preferences: {
        ...user.preferences,
        notifications: !user.preferences.notifications
      }
    });
  };

  const updateLanguage = (language) => {
    updateUser({
      preferences: {
        ...user.preferences,
        language
      }
    });
  };

  const updateEmail = (email) => {
    updateUser({ email });
  };

  const updateAddress = (address) => {
    updateUser({ address });
  };

  return (
    <UserContext.Provider value={{
      user,
      updateUser,
      updateProfilePicture,
      toggleDarkMode,
      toggleNotifications,
      updateLanguage,
      updateEmail,
      updateAddress,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
