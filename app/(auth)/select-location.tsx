import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const CITIES = [
  'Ahmedabad',
  'Bangalore',
  'Bhubaneswar',
  'Chennai',
  'Coimbatore',
  'Delhi',
  'Gurgaon',
  'Hyderabad',
  'Jaipur',
  'Kochi',
  'Kolkata',
];

export default function SelectLocation() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  const filteredCities = CITIES.filter(city =>
    city.toLowerCase().startsWith(searchText.toLowerCase())
  );

  const handleSelect = (city: string) => {
    console.log('Selected city:', city);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbox}>
        <TouchableOpacity onPress={() => router.back()}>
                    <Image
                      source={require('../../assets/icons/back-icon.png')} // Replace with your back icon
                      style={styles.icon}
                    />
                  </TouchableOpacity>
        <Text style={styles.header}>Location</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Type your location, landmark..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#888"
          />
          <Image
            source={require('../../assets/icons/search.png')}
            style={styles.searchIcon}
          />
        </View>
      </View>

      <FlatList
        data={filteredCities}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cityItem} onPress={() => handleSelect(item)}>
            <Text style={styles.cityText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="handled"
      />

      <TouchableOpacity
        style={styles.useCurrentButton}
        onPress={() => router.push('/(auth)/map')}
      >
        <Image
          source={require('../../assets/icons/mapview-icon.png')}
          style={styles.currentIcon}
        />
        <Text style={styles.useCurrentText}>Use my current location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4faff',
    
    
  },
  topbox: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 30,
    paddingTop: 60,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#222',
    marginBottom: 20,        // you can reduce this if needed
  marginTop: -22,
  fontFamily:'Poppins',

  },

  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf5ff',
    paddingHorizontal: 12,
    height: 47,
    //borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: '#777',
  },
  cityItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingHorizontal:20,
  },
  cityText: {
    fontSize: 16,
    color: '#111',
    fontFamily: 'Poppins',
    marginLeft: 10,
  },
  useCurrentButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    width:300,
    marginTop: 20,
    marginBottom: 30,
    marginLeft:30,
  },
  useCurrentText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  currentIcon: {
    width: 18,
    height: 18,
    tintColor: '#fff',
  },
});
