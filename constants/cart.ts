// constants/cart.ts

export const CART_CONFIG = {
  SWIPE_THRESHOLD: -80, 
};

export const INITIAL_CART_ITEMS = [
  {
    name: '20L Water Can Packed drinking water',
    subtitle: '20 Litre (x4)',
    image: require('../assets/images/can1.png'),
    price: 160,
  },
  {
    name: '1L Water Bottle Packed drinking water',
    subtitle: '1 Litre (x2)',
    image: require('../assets/images/can2.png'),
    price: 160,
  },
  {
    name: '500ml Water Bottle Packed drinking water',
    subtitle: '500ml (x1)',
    image: require('../assets/images/can3.png'),
    price: 160,
  },
];

export const AVAILABLE_PRODUCTS = [
  { 
    name: '20L Water Can', 
    image: require('../assets/images/prod1.png'), 
    price: '399' 
  },
  { 
    name: '1L Water Bottle', 
    image: require('../assets/images/prod2.png'), 
    price: '80' 
  },
];

export const CART_ICONS = {
  back: require('../assets/icons/back-icon.png'),
  delete: require('../assets/icons/delete-icon.png'),
  minus: require('../assets/icons/minus-icon.png'),
  plus: require('../assets/icons/plus-icon.png'),
  rupees: require('../assets/icons/rupees-icon.png'),
  star: require('../assets/icons/star-icon.png'),
  save: require('../assets/icons/save-icon.png'),
  cart: require('../assets/icons/cart-icon.png'),
};