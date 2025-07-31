import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

export default function MyOrders() {
   const [fontsLoaded] = useFonts({
          Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
          PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
        });
      
        if (!fontsLoaded) return null;
        
  
  const router = useRouter();

  const orderItems = [
    {
      id: 1,
      name: '20L Water Can Packaged',
      qty: '20 Litre (x4)',
      price: '₹320',
      image: require('../../assets/images/prod1.png'),
    },
    {
      id: 2,
      name: '20L Water Can Packaged',
      qty: '1 Litre (x2)',
      price: '₹160',
      image: require('../../assets/images/prod3.png'),
    },
    {
      id: 3,
      name: '20L Water Can Packaged',
      qty: '500ml (x1)',
      price: '₹160',
      image: require('../../assets/images/prod3.png'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* ---- header ---- */}
      <Text style={styles.header}>My Order</Text>
      <Text style={styles.subHeader}>3 Item in this order</Text>

      {/* ---- order list ---- */}
      {orderItems.map((item) => (
        <View style={styles.card} key={item.id}>
          <Image source={item.image} style={styles.image} />

          <View style={styles.details}>
            <Text numberOfLines={1} style={styles.productName}>{item.name}</Text>
            <Text style={styles.qty}>{item.qty}</Text>
            <TouchableOpacity>
              <Text style={styles.viewDetails}>View Details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rightSide}>
            <View style={styles.ratingRow}>
              <FontAwesome name="star" color="#FFD700" size={16} />
              <Text style={styles.rating}>4.8</Text>
            </View>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      ))}

      {/* blue gap */}
      <View style={styles.fullBlueGap} />

      {/* ---- tracking card ---- */}
      <Text style={styles.trackingHeader}>Order Tracking</Text>

      <View style={styles.card}>
        <Image source={orderItems[0].image} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.productName}>Packed drinking water</Text>
          <Text style={styles.qty}>20L (x4), 1L (x2), 500ml (x1)</Text>
          <TouchableOpacity>
            <Text style={styles.viewDetails}>View Details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightSide}>
          <View style={styles.ratingRow}>
            <FontAwesome name="star" color="#FFD700" size={16} />
            <Text style={styles.rating}>4.8</Text>
          </View>
          <Text style={styles.price}>₹640</Text>
        </View>
      </View>

      {/* ---- timeline ---- */}
      <View style={styles.timelineContainer}>
        <View style={styles.timelineRow}>
          {['Pick up', 'Dispatched', 'Arrived', 'Delivery'].map((stage, i) => {
            const isActive = i === 0;
            return (
              <React.Fragment key={i}>
                <View style={styles.timelineStep}>
                  <View style={[
                    styles.outerDotted,
                    isActive ? styles.activeOuter : styles.inactiveOuter]}>
                    <View style={[
                      styles.innerDot,
                      isActive ? styles.activeInner : styles.inactiveInner]} />
                  </View>
                  <Text style={styles.timelineLabel}>{stage}</Text>
                  <Text style={styles.timelineDate}>1 May 25</Text>
                </View>
                {i < 3 && <View style={styles.dashedLine} />}
              </React.Fragment>
            );
          })}
        </View>
      </View>

      <TouchableOpacity style={styles.timelineDetails}>
        <Text style={styles.viewDetails}>View Details</Text>
      </TouchableOpacity>

      {/* ---- total ---- */}
      <View style={styles.totalContainer}>
        <View>
          <Text style={styles.totalText}>
            Total Amount: <Text style={styles.totalAmount}>₹640.00</Text>
          </Text>
          <Text style={styles.includingTax}>(Including Tax)</Text>
        </View>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },

  header: { 
    fontFamily: 'Poppins', 
    fontSize: 20, 
    fontWeight: '500', 
    marginBottom: 10 
  },
  subHeader: { fontFamily: 'Poppins', color: '#555', marginBottom: 16 },


  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 5,
    marginBottom: 10,
  },
  image: { width: 90, height: 100, resizeMode: 'contain', borderRadius: 10 },

  details: { flex: 1, marginLeft: 12 },
  productName: { fontSize: 15, width: 140, fontFamily: 'Poppins' },
  qty: { fontFamily: 'Poppins', color: '#777', fontSize: 13, marginTop: 2 },
  viewDetails: { fontFamily: 'PoppinsBold', color: '#339CFF', fontSize: 13, marginTop: 4 },

  rightSide: { alignItems: 'flex-end' },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  rating: { fontSize: 13, marginLeft: 4, color: '#333' },
  price: { fontFamily: 'PoppinsBold', fontSize: 15, marginTop: 8 },

  fullBlueGap: { height: 16, width: screenWidth, backgroundColor: '#E6F0FF', alignSelf: 'center' },

  trackingHeader: { 
    fontFamily: 'Poppins', 
    fontWeight: '500', 
    fontSize: 18, 
    marginVertical: 10 
  },

 
  timelineContainer: { backgroundColor: '#fff', marginTop: 8, borderRadius: 10, padding: 16 },
  timelineRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timelineStep: { 
    alignItems: 'center', 
    width: 70, 
    minWidth: 70 
  },
  outerDotted: {
    width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderStyle: 'dashed',
    justifyContent: 'center', alignItems: 'center', marginBottom: 6,
  },
  innerDot: { width: 12, height: 12, borderRadius: 6 },
  activeOuter: { borderColor: '#339CFF' },
  inactiveOuter: { borderColor: '#ccc' },
  activeInner: { backgroundColor: '#339CFF' },
  inactiveInner: { backgroundColor: '#ccc' },
  timelineLabel: { 
    fontFamily: 'Poppins-Bold', 
    fontSize: 12, 
    color: '#333', 
    marginBottom: 2, 
    textAlign: 'center',
    flexWrap: 'nowrap', 
  },
  timelineDate: { 
    fontFamily: 'Poppins-Regular', 
    fontSize: 11, 
    color: '#666', 
    textAlign: 'center' 
  },
  dashedLine: {
    flex: 1, 
    height: 1, 
    borderStyle: 'dashed', 
    borderWidth: 1, 
    borderColor: '#ccc',
    marginBottom: 45,
    marginHorizontal: 5, 
  },

  timelineDetails: { alignItems: 'flex-end', marginTop: -12 },

  /* total */
  totalContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 20, 
    paddingTop: 15, 
    paddingBottom: 30, 
    borderTopWidth: 1, 
    borderColor: '#eee',
  },
  totalText: { fontFamily: 'Poppins', fontSize: 15, color: '#333' },
  totalAmount: { fontFamily: 'PoppinsBold' },
  includingTax: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  detailButton: { 
    backgroundColor: '#339CFF', 
    paddingVertical: 8, 
    paddingHorizontal: 25,
    borderRadius: 4,
  },
  detailButtonText: { fontFamily: 'PoppinsBold', color: '#fff' },
});