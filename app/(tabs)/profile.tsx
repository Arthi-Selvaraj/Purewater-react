import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

// Import utilities and constants
import { customFonts, fontFamily } from '../../utils/fonts';
import { PROFILE_DATA, MENU_ITEMS, PROFILE_ICONS, PROFILE_COLORS, MenuItem } from '../../constants/profile';

export default function ProfileScreen() {
  const [fontsLoaded] = useFonts(customFonts);
  
  if (!fontsLoaded) return null;
      
  const router = useRouter();

  const renderIcon = (item: MenuItem) => {
    const iconProps = {
      size: 20,
      style: styles.itemIcon,
    };

    switch (item.iconType) {
      case 'Ionicons':
        return <Ionicons name={item.icon as any} {...iconProps} />;
      case 'Feather':
        return <Feather name={item.icon as any} {...iconProps} />;
      case 'FontAwesome':
        return <FontAwesome name={item.icon as any} {...iconProps} />;
      default:
        return <Ionicons name={item.icon as any} {...iconProps} />;
    }
  };

  const handleMenuItemPress = (item: MenuItem) => {
    if (item.route) {
      router.push(item.route as any);
    }
    // Add other menu item actions here
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
          <Image source={PROFILE_ICONS.back} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{PROFILE_DATA.user.initials}</Text>
        </View>
        
        <View style={styles.userInfo}>
          <Text style={styles.name}>{PROFILE_DATA.user.name}</Text>
          <Text style={styles.email}>{PROFILE_DATA.user.email}</Text>
        </View>
        <Feather name="edit" size={17} style={styles.editIcon} />
      </View>

      {/* Options List */}
      {MENU_ITEMS.map((item, index) => (
        <TouchableOpacity
          style={styles.item}
          key={index}
          onPress={() => handleMenuItemPress(item)}
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
    backgroundColor: PROFILE_COLORS.background,
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
    fontFamily: fontFamily.bold,
    marginRight: 230,
    marginTop: -4,
    color: PROFILE_COLORS.textPrimary,
  },
  editIcon: {
    color: PROFILE_COLORS.textPrimary,
    marginLeft: 30,
    marginBottom: 30,
  },
  profileSection: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PROFILE_COLORS.profileBackground,
    padding: 16,
    marginHorizontal: -16,
    marginLeft: -16,
    marginRight: -16,
  },
  avatar: {
    backgroundColor: PROFILE_COLORS.avatarBackground,
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
    color: PROFILE_COLORS.avatarText,
    fontFamily: fontFamily.regular,
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: PROFILE_COLORS.textPrimary,
  },
  email: {
    color: PROFILE_COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
    fontFamily: fontFamily.regular,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: PROFILE_COLORS.border,
    paddingHorizontal: 20,
  },
  itemIcon: {
    width: 26,
    color: PROFILE_COLORS.textSecondary,
    marginRight: 16,
  },
  itemText: {
    fontSize: 15,
    color: PROFILE_COLORS.textPrimary,
    fontFamily: fontFamily.regular,
  },
});