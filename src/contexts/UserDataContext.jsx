import { createContext, useState, useContext } from 'react';

const UserDataContext = createContext();

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

export const UserDataProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  const addAddress = (address) => {
    setAddresses(prev => [...prev, { id: Date.now(), ...address }]);
  };

  const removeAddress = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const addPaymentMethod = (method) => {
    setPaymentMethods(prev => [...prev, { id: Date.now(), ...method }]);
  };

  const removePaymentMethod = (methodId) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
  };

  const addOrder = (order) => {
    setOrderHistory(prev => [{ id: Date.now(), date: new Date(), ...order }, ...prev]);
  };

  const updateProfileImage = (imageUrl) => {
    setProfileImage(imageUrl);
  };

  const value = {
    addresses,
    paymentMethods,
    orderHistory,
    profileImage,
    addAddress,
    removeAddress,
    addPaymentMethod,
    removePaymentMethod,
    addOrder,
    updateProfileImage,
  };

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};
