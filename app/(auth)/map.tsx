import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CurrentLocationMap() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      {/* Map Image Background */}
      <ImageBackground
        source={require('../../assets/images/map.png')} 
        style={styles.mapImage}
      >
        {/* Top bar with back icon and title */}
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={require('../../assets/icons/back-icon.png')} 
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.locationHeader}>Location</Text>
        </View>

        {/* Search Input */}
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

        {/* Marker icon */}
        <Image
          source={require('../../assets/icons/location-marker.png')}
          style={styles.markerIcon}
        />

        {/* Use Current Location Button */}
        <TouchableOpacity style={styles.currentButton}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/icons/mapview-icon.png')}
              style={styles.locationBtnIcon}
            />
            <Text style={styles.currentButtonText}>Use my current location</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.row}>
          <Image
            source={require('../../assets/icons/location-icon.png')}
            style={styles.footerIcon}
          />
          <Text style={styles.locationText}>Coimbatore</Text>
        </View>
        <Text style={styles.addressText}>
          123, Coimbatore, Tamil Nadu, 641005.
        </Text>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapImage: {
    width: width,
    height: height * 0.84,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  topIcons: {
    width: '100%',
    marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    marginTop:20,
    height: 50,
    width:330,
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
  locationHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    //textAlign:'center',
    marginLeft:90,
  },
  markerIcon: {
    width: 35,
    height: 45,
    resizeMode: 'contain',
    position: 'absolute',
    top: '42%',
    alignSelf: 'center',
  },
  currentButton: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
   // borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationBtnIcon: {
    width: 18,
    height: 18,
    tintColor: '#007BFF',
    marginRight: 8,
    resizeMode: 'contain',
  },
  currentButtonText: {
    color: '#007BFF',
    fontWeight: '600',
    fontSize: 14,
  },
  footer: {
 backgroundColor: '#fff',
 paddingTop: 20,         // reduced top padding
  paddingBottom: 12,     // normal or slightly reduced bottom padding
  paddingHorizontal: 16, // horizontal spacing
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  position: 'absolute',
  bottom: 0,
  width: '100%',
  alignItems: 'center',
  elevation: 8,
},


  footerIcon: {
    width: 18,
    height: 18,
    tintColor: '#000',
    marginRight: 6,
    resizeMode: 'contain',
  },
  locationText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    letterSpacing:0.3
  },
  addressText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginVertical: 8,
    paddingTop:10,
    paddingBottom:20,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    //borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 40,
    width: '93%',
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
