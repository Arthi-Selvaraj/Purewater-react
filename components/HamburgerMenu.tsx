import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const DRAWER_W = width * 0.8;
const TOP_SPACE = height * 0.04;

type Props = { onClose: () => void };

export default function HamburgerMenu({ onClose }: Props) {
  const menuItems = [
    { icon: 'file-text', text: 'All Orders' },
    { icon: 'repeat', text: 'Subscriptions' },
    { icon: 'map-pin', text: 'Addresses' },
    { icon: 'credit-card', text: 'Payment Methods' },
    { icon: 'bell', text: 'Notifications' },
    { icon: 'globe', text: 'Language' },
    { icon: 'help-circle', text: 'Help & Support' },
    { icon: 'settings', text: 'Settings' },
    { icon: 'lock', text: 'Change Password' },
    { icon: 'file', text: 'Terms & Privacy Policy' },
    { icon: 'log-out', text: 'Logout' },
  ];

  return (
    <View style={styles.wrapper}>
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Drawer */}
      <View style={styles.drawer}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Feather name="x" size={18} color="#555" />
        </TouchableOpacity>

        {/* Scrollable Content */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.innerPad}>
          {/* User Info */}
          <View style={styles.userRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTxt}>DW</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>David Wilson</Text>
              <Text style={styles.email}>davidwilson123@gmail.com</Text>
            </View>

            <TouchableOpacity>
              <Feather name="edit-2" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          {menuItems.map(({ icon, text }, idx) => (
            <TouchableOpacity key={idx} style={styles.item}>
              <Feather name={icon as any} size={20} style={styles.itemIcon} />
              <Text style={styles.itemLabel}>{text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  drawer: {
    position: 'absolute',
    right: 0,
    top: TOP_SPACE,
    maxHeight: height - TOP_SPACE,
    width: DRAWER_W,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  innerPad: {
    paddingTop: 56,
    flexGrow: 0,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#CFE7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarTxt: {
    color: '#339CFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E6E6E6',
  },
  itemIcon: {
    width: 26,
    color: '#000',
  },
  itemLabel: {
    marginLeft: 12,
    fontSize: 15,
    color: '#000',
  },
});
