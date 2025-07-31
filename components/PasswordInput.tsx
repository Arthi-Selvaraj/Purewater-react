
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { fontFamily } from '../utils/fonts';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function PasswordInput({
  label,
  value,
  onChangeText,
  placeholder = '********',
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIconContainer}
        >
          <Image
            source={require('../assets/icons/eye.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
  },
  passwordContainer: {
    position: 'relative',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontFamily: fontFamily.regular,
    color: '#000',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 16,
    top: 13,
  },
});
