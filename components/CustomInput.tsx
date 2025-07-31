

import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { fontFamily } from '../utils/fonts';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
}

export default function CustomInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
}: Props) {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
      />
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
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontFamily: fontFamily.regular,
    color: '#000',
  },
});
