import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
  deliveryFee: 3.99,
  tax: 0,
};

function calculateTotal(items) {
  const subtotal = items.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const customizationsTotal = item.selectedCustomizations?.reduce(
      (acc, custom) => acc + custom.price,
      0
    ) || 0;
    return sum + (itemTotal + customizationsTotal * item.quantity);
  }, 0);
  
  const tax = subtotal * 0.1; // 10% tax
  return {
    subtotal,
    tax,
    total: subtotal + tax + initialState.deliveryFee,
  };
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id &&
        JSON.stringify(item.selectedCustomizations) === JSON.stringify(action.payload.selectedCustomizations)
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + action.payload.quantity };
          }
          return item;
        });
      } else {
        newItems = [...state.items, action.payload];
      }

      const { subtotal, tax, total } = calculateTotal(newItems);
      return {
        ...state,
        items: newItems,
        subtotal,
        tax,
        total,
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const { subtotal, tax, total } = calculateTotal(newItems);
      return {
        ...state,
        items: newItems,
        subtotal,
        tax,
        total,
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      const { subtotal, tax, total } = calculateTotal(newItems);
      return {
        ...state,
        items: newItems,
        subtotal,
        tax,
        total,
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
