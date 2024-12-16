export const restaurantData = {
  name: "Tasty Bites",
  logo: "/restaurant-logo.png",
  rating: 4.5,
  deliveryTime: "30-45 min",
  minimumOrder: 15,
};

export const menuItems = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Juicy beef patty with fresh lettuce, tomatoes, and our special sauce",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    category: "Burgers",
    customizations: [
      {
        name: "Extra Cheese",
        price: 1.50
      },
      {
        name: "Bacon",
        price: 2.00
      },
      {
        name: "Extra Patty",
        price: 3.50
      }
    ]
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomatoes, and basil on our homemade crust",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
    category: "Pizza",
    customizations: [
      {
        name: "Extra Cheese",
        price: 2.00
      },
      {
        name: "Extra Basil",
        price: 1.00
      }
    ]
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500",
    category: "Salads",
    customizations: [
      {
        name: "Grilled Chicken",
        price: 3.00
      },
      {
        name: "Extra Dressing",
        price: 0.50
      }
    ]
  },
  {
    id: 4,
    name: "Pasta Carbonara",
    description: "Spaghetti with creamy sauce, pancetta, and parmesan cheese",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500",
    category: "Pasta",
    customizations: [
      {
        name: "Extra Pancetta",
        price: 2.50
      },
      {
        name: "Extra Parmesan",
        price: 1.00
      }
    ]
  }
];

export const categories = [
  "All",
  "Burgers",
  "Pizza",
  "Salads",
  "Pasta",
  "Drinks",
  "Desserts"
];
