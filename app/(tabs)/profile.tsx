import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather, FontAwesome, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

interface MenuItem {
  icon: string;
  iconType: 'Ionicons' | 'Feather' | 'FontAwesome';
  text: string;
  route?: string;
}

export default function ProfileScreen() {
   const [fontsLoaded] = useFonts({
        Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
        PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
      });
    
      if (!fontsLoaded) return null;
      
  const router = useRouter();

  const menuItems: MenuItem[] = [
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

  const renderIcon = (item: MenuItem) => {
    if (item.iconType === 'Ionicons') {
      return (
        <Ionicons 
          name={item.icon as any} 
          size={20} 
          style={styles.itemIcon} 
        />
      );
    } else if (item.iconType === 'Feather') {
      return (
        <Feather 
          name={item.icon as any} 
          size={20} 
          style={styles.itemIcon} 
        />
      );
    } else {
      return (
        <FontAwesome 
          name={item.icon as any} 
          size={20} 
          style={styles.itemIcon} 
        />
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
       <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                 <Image source={require('../../assets/icons/back-icon.png')} style={styles.icon} />
               </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>DW</Text>
        </View>
        
        <View style={styles.userInfo}>
          <Text style={styles.name}>David Wilson</Text>
          <Text style={styles.email}>davidwilson123@gmail.com</Text>
        </View>
        <Feather name="edit" size={17} style={styles.editIcon} />
      </View>

      {/* Options List */}
      {menuItems.map((item, index) => (
        <TouchableOpacity
          style={styles.item}
          key={index}
          onPress={() => {
            if (item.route) {
             router.push('/(screen)/myOrders');
            }
          }}
        >
          {renderIcon(item)}
          <Text style={styles.itemText}>{item.text}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
     fontFamily: 'PoppinsBold',
     marginRight: 230,
     marginTop: -4
  },
  editIcon: {
    color: '#333',
    marginLeft: 30,
    marginBottom: 30,
  },
  profileSection: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F6FB',
    padding: 16,
    marginHorizontal: -16,
    marginLeft: -16,
    marginRight: -16,
  },
  avatar: {
    backgroundColor: '#CFE7FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#339CFF',
     fontFamily: 'Poppins',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
     fontFamily: 'PoppinsBold',
  },
  email: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
     fontFamily: 'Poppins',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    paddingHorizontal: 20,
  },
  itemIcon: {
    width: 26,
    color: '#666',
    marginRight: 16,
  },
  itemText: {
    fontSize: 15,
    color: '#000',
     fontFamily: 'Poppins',
  },
});