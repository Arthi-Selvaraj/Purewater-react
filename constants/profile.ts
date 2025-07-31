// constants/profile.ts

export interface MenuItem {
  icon: string;
  iconType: 'Ionicons' | 'Feather' | 'FontAwesome';
  text: string;
  route?: string;
}

export const PROFILE_DATA = {
  user: {
    name: 'David Wilson',
    email: 'davidwilson123@gmail.com',
    initials: 'DW',
  },
};

export const MENU_ITEMS: MenuItem[] = [
  { 
    icon: 'receipt-outline', 
    iconType: 'Ionicons',
    text: 'All Orders', 
    route: '/(screen)/myOrders' 
  },
  { 
    icon: 'receipt-outline', 
    iconType: 'Ionicons',
    text: 'Subscriptions' 
  },
  { 
    icon: 'people-outline', 
    iconType: 'Ionicons',
    text: 'Addresses' 
  },
  { 
    icon: 'card-outline', 
    iconType: 'Ionicons',
    text: 'Payment Methods' 
  },
  { 
    icon: 'notifications-outline', 
    iconType: 'Ionicons',
    text: 'Notifications' 
  },
  { 
    icon: 'globe-outline', 
    iconType: 'Ionicons',
    text: 'Language' 
  },
  { 
    icon: 'headphones', 
    iconType: 'Feather',
    text: 'Help & Support' 
  },
  { 
    icon: 'settings-outline', 
    iconType: 'Ionicons',
    text: 'Settings' 
  },
  { 
    icon: 'key-outline', 
    iconType: 'Ionicons',
    text: 'Change Password' 
  },
  { 
    icon: 'document-text-outline', 
    iconType: 'Ionicons',
    text: 'Terms & Privacy Policy' 
  },
  { 
    icon: 'log-out-outline', 
    iconType: 'Ionicons',
    text: 'Logout' 
  },
];

export const PROFILE_ICONS = {
  back: require('../assets/icons/back-icon.png'),
};

export const PROFILE_COLORS = {
  background: '#F9FBFC',
  profileBackground: '#F0F6FB',
  avatarBackground: '#CFE7FF',
  avatarText: '#339CFF',
  textPrimary: '#000',
  textSecondary: '#666',
  border: '#ddd',
};