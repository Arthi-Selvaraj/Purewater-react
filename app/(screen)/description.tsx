import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');

export default function Description() {
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(4.8);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  const back = () => router.back();
  const toCart = () => router.push('/(tabs)/cart');

  const increaseRating = () => {
    const newRating = rating + 0.1;
    setRating(newRating > 5.0 ? 5.0 : parseFloat(newRating.toFixed(1)));
  };

  const availableProducts = [
    { name: '20L Can', image: require('../../assets/images/can1.png') },
    { name: '500ml Bottle', image: require('../../assets/images/can2.png') },
    { name: '1L Bottle', image: require('../../assets/images/can3.png') },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/des1.png')} style={styles.productImage} />
          <View style={styles.headerOverlay}>
            <TouchableOpacity onPress={back}>
              <Image source={require('../../assets/icons/back-icon.png')} style={styles.icon} />
            </TouchableOpacity>

            <View style={styles.iconGroup}>
              <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
                <Image 
                  source={require('../../assets/icons/save-icon.png')} 
                  style={[styles.icon, isSaved && { tintColor: 'yellow' }]} 
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toCart}>
                <Image source={require('../../assets/icons/cart-icon.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Thumbnails */}
        <View style={styles.thumbnails}>
          {[1, 2, 3].map((_, i) => (
            <View
              key={i}
              style={[styles.thumbnailItem, i === 0 && styles.activeThumbnail]}>
              <Image source={require('../../assets/images/prod1.png')} style={styles.thumbnailImage} />
            </View>
          ))}
        </View>

        {/* Product Info */}
        <View style={styles.infoBox}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>20L Water Can Packed drinking water</Text>
            <TouchableOpacity>
              <Feather name="share-2" size={18} color="#007BFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Image source={require('../../assets/icons/rupees-icon.png')} style={styles.rupeeIcon} />
              <Text style={styles.price}>80</Text>
              <Text style={styles.perCase}>Per One</Text>
            </View>

            <TouchableOpacity onPress={increaseRating} style={styles.ratingBox}>
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesome
                  key={star}
                  name="star"
                  size={14}
                  color={star <= Math.floor(rating) ? '#FFD700' : '#ddd'}
                  style={{ marginRight: 2 }}
                />
              ))}
              <Text style={styles.rating}>{rating.toFixed(1)}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.paragraph}>
            There are many variations of passages some form, by injected humour, or randomised words
            which don't look even slightly believable.
          </Text>
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantityRow}>
          <Text style={styles.sectionLabel}>Selection Quantity</Text>

          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Image source={require('../../assets/icons/minus-icon.png')} style={styles.qtyIcon} />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => q + 1)}
            >
              <Image source={require('../../assets/icons/plus-icon.png')} style={styles.qtyIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={require('../../assets/images/banner.png')} style={styles.bannerImage} />
          <View style={styles.overlayContent}>
            <Text style={styles.bannerTitle}>Pure Water</Text>
            <Text style={styles.bannerSubtitle}>Purified Drinking Water</Text>
            <Text style={styles.bannerDescription}>
              Discover water you love. Daily deals,{'\n'}fast delivery, and exclusive offers.
            </Text>
            <TouchableOpacity style={styles.shopButton}>
              <Text style={styles.shopButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs Section */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'description' && styles.activeTab]}
            onPress={() => setActiveTab('description')}
          >
            <Text style={[styles.tabText, activeTab === 'description' && styles.activeTabText]}>
              Products Description
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'delivery' && styles.activeTab]}
            onPress={() => setActiveTab('delivery')}
          >
            <Text style={[styles.tabText, activeTab === 'delivery' && styles.activeTabText]}>
              Delivery Instruction
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'additional' && styles.activeTab]}
            onPress={() => setActiveTab('additional')}
          >
            <Text style={[styles.tabText, activeTab === 'additional' && styles.activeTabText]}>
              Additional
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'description' && (
            <View>
              <Text style={styles.descriptionText}>
                Pure Water isn't just ordinary bottled water—each drop is a promise of purity and health. Our water undergoes a rigorous 10-stage purification process and passes through quality tests to ensure unmatched safety and taste.
              </Text>
              <Text style={styles.descriptionText}>
                As a proud Indian brand, we've been committed to purity, safety, and trust since our inception.
              </Text>
              
              {/* Quality Features */}
              <View style={styles.featuresContainer}>
                {[
                  '90 Quality Checks',
                  '10-Stage Purification Process',
                  'Added Essential Minerals',
                  'Double Ozonisation',
                  'Contactless Production',
                  'Balanced TDS up to 150 PPM'
                ].map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <View style={styles.checkIcon}>
                      <FontAwesome name="check" size={12} color="#fff" />
                    </View>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          {activeTab === 'delivery' && (
            <View>
              <Text style={styles.descriptionText}>
                • Free delivery within 24 hours for orders above ₹500
              </Text>
              <Text style={styles.descriptionText}>
                • Same day delivery available in select areas
              </Text>
              <Text style={styles.descriptionText}>
                • Contact-free delivery options available
              </Text>
              <Text style={styles.descriptionText}>
                • Track your order in real-time
              </Text>
            </View>
          )}
          
          {activeTab === 'additional' && (
            <View>
              <Text style={styles.descriptionText}>
                • BIS certified and FDA approved
              </Text>
              <Text style={styles.descriptionText}>
                • Eco-friendly packaging
              </Text>
              <Text style={styles.descriptionText}>
                • Return empty bottles for recycling
              </Text>
              <Text style={styles.descriptionText}>
                • Subscribe for regular delivery discounts
              </Text>
            </View>
          )}
        </View>

        {/* Subscribe Section - Using Home Page Design */}
        <View style={styles.subscribeContainer}>
          <Image
            source={require('../../assets/images/bannerbottom.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>Subscribe now</Text>
          </TouchableOpacity>
        </View>

        {/* Available Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Products</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/product')}>
            <Text style={styles.viewAll}>View all →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productScroll}
        >
          {availableProducts.map((item, i) => (
            <TouchableOpacity key={i} style={styles.productIcon}>
              <Image source={item.image} style={styles.productIconImage} />
              <Text style={styles.productIconLabel}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Bottom Buy Button */}
      <TouchableOpacity style={styles.buyButton} onPress={toCart}>
        <Text style={styles.buyButtonText}>Buy now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F7FAFF' 
  },

  // Image header
  imageContainer: { 
    width, 
    height: 380 
  },
  productImage: { 
    width: '100%', 
    height: '100%', 
    borderBottomLeftRadius: 12, 
    borderBottomRightRadius: 12 
  },
  headerOverlay: {
    position: 'absolute', 
    top: 40, 
    left: 16, 
    right: 16, 
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  icon: { 
    width: 20, 
    height: 20, 
    resizeMode: 'contain' 
  },
  iconGroup: { 
    flexDirection: 'row', 
    gap: 16 
  },

  // Thumbnails
  thumbnails: { 
    flexDirection: 'row', 
    gap: 8, 
    marginTop: 12, 
    marginRight: 160, 
    justifyContent: 'center' 
  },
  thumbnailItem: { 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 4 
  },
  activeThumbnail: { 
    borderColor: '#007BFF' 
  },
  thumbnailImage: { 
    width: 40, 
    height: 40, 
    resizeMode: 'contain' 
  },

  // Info
  infoBox: { 
    paddingHorizontal: 16, 
    marginTop: 16 
  },
  titleRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 16, 
    flex: 1, 
    marginRight: 8, 
    fontFamily: 'PoppinsBold',
    color: '#333'
  },
  priceRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginTop: 8 
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rupeeIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 4,
  },
  price: { 
    fontFamily: 'PoppinsBold', 
    fontSize: 32, 
    color: '#000' 
  },
  perCase: { 
    fontFamily: 'Poppins', 
    fontSize: 12, 
    color: '#777', 
    marginLeft: 8 
  },
  ratingBox: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  rating: { 
    fontFamily: 'Poppins', 
    fontSize: 13, 
    color: '#444', 
    marginLeft: 4 
  },
  paragraph: { 
    fontFamily: 'Poppins', 
    fontSize: 13, 
    color: '#777', 
    marginTop: 12,
    lineHeight: 18 
  },

  // Quantity selector
  quantityRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    marginTop: 24 
  },
  sectionLabel: { 
    fontFamily: 'PoppinsBold', 
    fontSize: 14 
  },
  quantityControl: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#007BFF', 
    borderRadius: 8 
  },
  qtyBtn: { 
    width: 32, 
    height: 32, 
    backgroundColor: '#E5F0FF', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  qtyIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  quantityText: { 
    width: 40, 
    textAlign: 'center', 
    fontFamily: 'Poppins', 
    fontSize: 16 
  },

  // Banner
  bannerContainer: { 
    width: width * 0.9, 
    height: 190, 
    alignSelf: 'center', 
    justifyContent: 'center',
    marginTop: 24 
  },
  bannerImage: { 
    width: '100%', 
    height: '88%', 
    position: 'absolute', 
    borderRadius: 8 
  },
  overlayContent: { 
    paddingLeft: 20, 
    paddingRight: 40, 
    zIndex: 2 
  },
  bannerTitle: { 
    fontFamily: 'PoppinsBold', 
    fontSize: 23, 
    color: '#000' 
  },
  bannerSubtitle: { 
    fontFamily: 'Poppins', 
    fontSize: 14, 
    color: '#000', 
    marginTop: 4 
  },
  bannerDescription: { 
    fontFamily: 'Poppins', 
    fontSize: 10, 
    color: '#676767', 
    marginVertical: 8 
  },
  shopButton: { 
    backgroundColor: '#2196F3', 
    paddingHorizontal: 5, 
    paddingVertical: 7, 
    borderRadius: 5, 
    marginTop: 5, 
    width: width * 0.27 
  },
  shopButtonText: { 
    fontFamily: 'PoppinsBold', 
    fontSize: 10, 
    color: '#fff', 
    textAlign: 'center' 
  },

  // Tabs
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingBottom: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007BFF',
  },
  tabText: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Poppins',
  },
  activeTabText: {
    color: '#007BFF',
    fontFamily: 'PoppinsBold',
  },

  // Tab Content
  tabContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  descriptionText: {
    fontSize: 13,
    color: '#777',
    lineHeight: 18,
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  featuresContainer: {
    marginTop: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    fontSize: 13,
    color: '#333',
    fontFamily: 'Poppins',
  },

  // Subscribe Section - Using Home Page Design
  subscribeContainer: {
    width: width * 0.92,
    height: 190,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 20,
  },
  subscribeButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 90,
    marginLeft: 190,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'PoppinsBold',
  },

  // Available products
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    marginTop: 24, 
    alignItems: 'center' 
  },
  sectionTitle: { 
    fontFamily: 'PoppinsBold', 
    fontSize: 16 
  },
  viewAll: { 
    fontFamily: 'Poppins', 
    fontSize: 13, 
    color: '#007BFF' 
  },
  productScroll: { 
    paddingLeft: 16, 
    paddingRight: 8,
    paddingBottom: 20 
  },
  productIcon: { 
    alignItems: 'center', 
    marginRight: 24 
  },
  productIconImage: { 
    width: 70, 
    height: 70, 
    resizeMode: 'contain' 
  },
  productIconLabel: { 
    fontFamily: 'Poppins', 
    fontSize: 12, 
    marginTop: 4, 
    color: '#333' 
  },

  // Buy button
  buyButton: { 
    backgroundColor: '#007BFF', 
    paddingVertical: 16, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginHorizontal: 20, 
    marginBottom: 20,
    borderRadius: 8 
  },
  buyButtonText: { 
    fontFamily: 'PoppinsBold', 
    fontSize: 16, 
    color: '#fff' 
  },
});