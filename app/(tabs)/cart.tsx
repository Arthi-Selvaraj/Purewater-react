import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Alert,
  Animated,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = -80; // Minimum swipe distance to reveal delete

export default function Cart() {
   const [fontsLoaded] = useFonts({
        Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
        PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
      });
    
      if (!fontsLoaded) return null;
      
  const router = useRouter();
  const [quantities, setQuantities] = useState([1, 1, 1]);
  const [cartItems, setCartItems] = useState([
    {
      name: '20L Water Can Packed drinking water',
      subtitle: '20 Litre (x4)',
      image: require('../../assets/images/can1.png'),
      price: 160,
    },
    {
      name: '1L Water Bottle Packed drinking water',
      subtitle: '1 Litre (x2)',
      image: require('../../assets/images/can2.png'),
      price: 160,
    },
    {
      name: '500ml Water Bottle Packed drinking water',
      subtitle: '500ml (x1)',
      image: require('../../assets/images/can3.png'),
      price: 160,
    },
  ]);

  // Animation values for each cart item
  const [panAnimations] = useState(
    cartItems.map(() => new Animated.Value(0))
  );

  const updateQuantity = (index: number, delta: number) => {
    const updated = [...quantities];
    updated[index] = Math.max(1, updated[index] + delta);
    setQuantities(updated);
  };

  const deleteItem = (index: number) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            // Reset swipe position
            Animated.spring(panAnimations[index], {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const updatedCartItems = cartItems.filter((_, i) => i !== index);
            const updatedQuantities = quantities.filter((_, i) => i !== index);
            const updatedAnimations = panAnimations.filter((_, i) => i !== index);
            
            setCartItems(updatedCartItems);
            setQuantities(updatedQuantities);
            panAnimations.splice(index, 1);
          },
        },
      ]
    );
  };

  const handlePanGesture = (index: number) => (event: any) => {
    const { translationX } = event.nativeEvent;
    
    // Only allow left swipe (negative values)
    if (translationX <= 0) {
      panAnimations[index].setValue(Math.max(translationX, SWIPE_THRESHOLD));
    }
  };

  const handlePanEnd = (index: number) => (event: any) => {
    const { translationX } = event.nativeEvent;
    
    if (translationX < SWIPE_THRESHOLD / 2) {
      // Show delete button
      Animated.spring(panAnimations[index], {
        toValue: SWIPE_THRESHOLD,
        useNativeDriver: true,
      }).start();
    } else {
      // Hide delete button
      Animated.spring(panAnimations[index], {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const total = quantities.reduce((acc, q, i) => acc + q * cartItems[i].price, 0);

  const availableProducts = [
    { name: '20L Water Can', image: require('../../assets/images/prod1.png'), price: '399' },
    { name: '1L Water Bottle', image: require('../../assets/images/prod2.png'), price: '80' },
  ];

  const SwipeableCartItem = ({ item, index }: { item: any, index: number }) => (
    <View style={styles.swipeContainer}>
      {/* Delete button background */}
      <View style={styles.deleteBackground}>
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => deleteItem(index)}
        >
          <Image source={require('../../assets/icons/delete-icon.png')} style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>

      {/* Main cart item content */}
      <PanGestureHandler
        onGestureEvent={handlePanGesture(index)}
        onHandlerStateChange={handlePanEnd(index)}
      >
        <Animated.View 
          style={[
            styles.cartItem,
            {
              transform: [{ translateX: panAnimations[index] }],
            },
          ]}
        >
          <Image source={item.image} style={styles.cartImage} />
          <View style={styles.itemInfo}>
            <Text numberOfLines={1} style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
            <TouchableOpacity onPress={() => router.push('/(screen)/description')}>
              <Text style={styles.viewDetails}>View Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.qtyBox}>
            <View style={styles.qtyControl}>
              <TouchableOpacity onPress={() => updateQuantity(index, -1)}>
                <Image source={require('../../assets/icons/minus-icon.png')} style={styles.qtyIcon} />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantities[index]}</Text>
              <TouchableOpacity onPress={() => updateQuantity(index, 1)}>
                <Image source={require('../../assets/icons/plus-icon.png')} style={styles.qtyIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.itemPrice}>
              <Image source={require('../../assets/icons/rupees-icon.png')} style={styles.rupeeIcon} />
              <Text style={styles.priceText}>{item.price}</Text>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={require('../../assets/icons/back-icon.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Cart</Text>
          <TouchableOpacity style={styles.addMoreBtn} onPress={() => router.push('/(tabs)/product')}>
            <Text style={styles.addMoreText}>Add More</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.itemCount}>{cartItems.length} Items in this order</Text>

          {cartItems.map((item, index) => (
            <SwipeableCartItem key={index} item={item} index={index} />
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <View style={styles.totalAmountBox}>
              <Image source={require('../../assets/icons/rupees-icon.png')} style={styles.rupeeIcon} />
              <Text style={styles.totalAmount}>{total.toFixed(2)}</Text>
            </View>
          </View>
          <Text style={styles.includingTax}>(Including Tax)</Text>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Products</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/product')}>
              <Text style={styles.viewAll}>View all →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productsContainer}>
            {availableProducts.map((item, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.ratingContainer}>
                    <Image source={require('../../assets/icons/star-icon.png')} style={styles.iconStar} />
                    <Text style={styles.rating}>4.8</Text>
                  </View>
                  <Image source={require('../../assets/icons/save-icon.png')} style={styles.iconSave} />
                </View>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.newbox}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.caseSubText}>Case of 24 bottles</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.cartButton}
                    onPress={() => router.push('/(tabs)/cart')}
                  >
                    <Image source={require('../../assets/icons/cart-icon.png')} style={styles.iconCart} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.productPrice}>
                  <Image source={require('../../assets/icons/rupees-icon.png')} style={styles.rupeeIcon} />
                  {item.price} <Text style={styles.perCase}>Per case</Text>
                </Text>
                <TouchableOpacity style={styles.buyNowBtn} onPress={() => router.push('/(screen)/description')}>
                  <Text style={styles.buyNowText}>Buy now</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View>
            <Text style={styles.footerTotalLabel}>Total Amount:</Text>
            <Text style={styles.footerTotal}>₹{total.toFixed(2)}</Text>
            <Text style={styles.footerTaxNote}>(Including Tax)</Text>
          </View>
          <TouchableOpacity style={styles.orderBtn} onPress={() => router.push('/(screen)/payment')}>
            <Text style={styles.orderText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    height: 60,
    backgroundColor: '#F7FAFF',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    marginTop: 20,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins',
  },
  addMoreBtn: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addMoreText: {
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'PoppinsBold',
  },
  itemCount: {
    paddingHorizontal: 16,
    color: '#777',
    marginBottom: 8,
  },
  // Swipe container styles
  swipeContainer: {
    position: 'relative',
    marginVertical: 6,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  deleteBackground: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  deleteButton: {
    width: 60,
    height: 60,
    backgroundColor: '#FFE5E5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFB3B3',
  },
  deleteIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#FF4444',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#F7FAFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    zIndex: 2,
    marginBottom: 9,
  },
  cartImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  itemInfo: {
    flex: 1,
    paddingLeft: 12,
  },
  itemTitle: {
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  viewDetails: {
    color: '#007BFF',
    fontSize: 13,
  },
  qtyBox: {
    alignItems: 'center',
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
  },
  qtyIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  qtyText: {
    fontSize: 14,
    paddingHorizontal: 8,
    fontFamily: 'Poppins',
  },
  itemPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rupeeIcon: {
    width: 12,
    height: 12,
    marginRight: 2,
    resizeMode: 'contain',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'PoppinsBold',
  },
  totalRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 15,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalAmountBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'PoppinsBold',
  },
  includingTax: {
    textAlign: 'right',
    paddingHorizontal: 16,
    fontSize: 12,
    color: '#888',
    fontFamily: 'Poppins',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 40,
    fontFamily: 'PoppinsBold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 15,
    backgroundColor: '#F7FAFF',
  },
  viewAll: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 30,
    fontFamily: 'PoppinsBold',
  },
  // Optimized products container
  productsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: (width - 48) / 2, // Perfect two card layout with proper spacing
    padding: 2,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  // Enhanced icon styles
  iconStar: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
      color: '#333',
  },
  iconSave: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#000', // Light save icon like product screen
  },
  iconCart: {
    width: 30,
    height: 23,
    resizeMode: 'contain',
  },
  productImage: {
    width: '100%',
    height: 160,
    resizeMode: 'contain',
    marginVertical: 8,
  },
  newbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'Poppins',
    lineHeight: 18,
  },
  caseSubText: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'Poppins',
    marginTop: 2,
  },
  productPrice: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'PoppinsBold',
    marginBottom: 4,
  },
  perCase: {
    fontSize: 11,
    color: '#888',
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  cartButton: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  buyNowBtn: {
    marginTop: 10,
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    width: '100%',
    borderRadius: 6,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'PoppinsBold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 70,
  },
  footerTotalLabel: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  footerTotal: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'PoppinsBold',
  },
  footerTaxNote: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Poppins',
  },
  orderBtn: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  orderText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'PoppinsBold',
  },
});