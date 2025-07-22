import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useFonts } from 'expo-font';
import HamburgerMenu from '../../components/HamburgerMenu'; 

const { width } = Dimensions.get('window');

// Define types for product data
type ProductData = {
  title: string;
  price: string;
  originalPrice: string;
  rating: string;
  image: ImageSourcePropType;
  subtitle?: string;
};

// Define banner data for horizontal scrolling
const bannerData = [
  {
    image: require('../../assets/images/banner.png'),
    title: 'Pure Water',
    subtitle: 'Purified Drinking Water',
    description: 'Discover water you love. Daily deals,\nfast delivery, and exclusive offers.',
  },
  {
    image: require('../../assets/images/banner.png'),
    title: 'Hydration Deals',
    subtitle: 'Stay Refreshed',
    description: 'Great prices on all your favorite\n water brands. Shop now!',
  },
  {
    image: require('../../assets/images/banner.png'),
    title: 'Eco-Friendly Options',
    subtitle: 'Sustainable Choices',
    description: 'Explore our range of \nrecyclable bottles and large cans.',
  },
];

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  // Search functionality state
  const [searchQuery, setSearchQuery] = useState('');

  if (!fontsLoaded) return null;
    
  const baseCategories = [
    { title: '20L Can', image: require('../../assets/images/can1.png') },
    { title: '500ml Bottle', image: require('../../assets/images/can2.png') },
    { title: '1L Bottle', image: require('../../assets/images/can3.png') },
  ];

  const DUPLICATION_FACTOR = 50;
  const categories = Array(DUPLICATION_FACTOR).fill(baseCategories).flat();

  const [menuVisible, setMenuVisible] = useState(false);
  const scrollViewCategoriesRef = useRef<ScrollView>(null);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // --- CRITICAL CALCULATIONS FOR CATEGORY SNAPPING, PADDING, AND LOOPING ---
  const SCROLLVIEW_HORIZONTAL_PADDING = 16; 
  const ITEM_IMAGE_WIDTH = (width / 4);
  const ITEM_CONTAINER_MARGIN_RIGHT = 16;
  const CATEGORY_VISIBLE_WIDTH = ITEM_IMAGE_WIDTH + ITEM_CONTAINER_MARGIN_RIGHT;
  const numberOfBaseItems = baseCategories.length;
  const centralSetOffset = numberOfBaseItems * CATEGORY_VISIBLE_WIDTH * Math.floor(DUPLICATION_FACTOR / 2);
  const initialScrollOffset = centralSetOffset; 

  useEffect(() => {
    if (scrollViewCategoriesRef.current) {
      scrollViewCategoriesRef.current.scrollTo({ x: initialScrollOffset, animated: false });
    }
  }, []);

  // Search handlers
  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add your search logic here
      // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleMicPress = () => {
    console.log('Mic pressed');
    // Add voice input logic here
  };

  const handleScrollEndCategories = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const jumpThreshold = numberOfBaseItems * CATEGORY_VISIBLE_WIDTH; 

    if (contentOffsetX >= initialScrollOffset + jumpThreshold) {
      scrollViewCategoriesRef.current?.scrollTo({
        x: contentOffsetX - jumpThreshold,
        animated: false,
      });
    } else if (contentOffsetX <= initialScrollOffset - jumpThreshold) {
      scrollViewCategoriesRef.current?.scrollTo({
        x: contentOffsetX + jumpThreshold,
        animated: false,
      });
    }
  };

  // --- HANDLERS FOR BANNER SCROLLING AND DOT INDICATORS ---
  const handleBannerScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width); 
    setActiveBannerIndex(currentIndex);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={22} color="#000" />
            <Text style={styles.location}>Coimbatore</Text>
            <Ionicons name="chevron-down" size={14} color="#666" />
          </View>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <FontAwesome name="bars" size={24} />
          </TouchableOpacity>
        </View>

        {/* Search Box */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#888" />
          <TextInput 
            placeholder="Search..." 
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={handleMicPress}>
            <Ionicons name="mic" size={18} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Banner - Now with Horizontal Scrolling */}
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          onScroll={handleBannerScroll}
          scrollEventThrottle={200}
          onMomentumScrollEnd={handleBannerScroll}
        >
          {bannerData.map((banner, index) => (
            <View key={index} style={[styles.bannerContainer, { width: width - (SCROLLVIEW_HORIZONTAL_PADDING * 2) }]}>
              <Image
                source={banner.image}
                style={styles.bannerImage}
                resizeMode="cover"
              />
              <View style={styles.overlayContent}>
                <Text style={styles.bannerTitle}>
                  <Text style={styles.pureText}>Pure</Text>
                  <Text style={styles.waterText}> Water</Text>
                </Text>
                <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                <Text style={styles.bannerDescription}>{banner.description}</Text>
                <TouchableOpacity style={styles.shopButton}>
                  <Text style={styles.shopButtonText}>Start Shopping</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Banner Dot Indicators */}
        <View style={styles.dotsContainer}>
          {bannerData.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.dot, 
                activeBannerIndex === index && styles.activeDot
              ]} 
            />
          ))}
        </View>

        {/* Categories - Infinite Loop with Perfect Snapping and Padding */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRowPadded} 
          ref={scrollViewCategoriesRef}
          onMomentumScrollEnd={handleScrollEndCategories}
          snapToInterval={CATEGORY_VISIBLE_WIDTH} 
          snapToAlignment="start" 
          decelerationRate="fast" 
        >
          {categories.map((cat, index) => (
            <TouchableOpacity key={`${cat.title}-${index}`} style={styles.categoryContainer}>
              <View style={styles.categoryImageContainer}>
                <Image source={cat.image} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryLabel}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Most Popular Products */}
        <Section title="Most Popular Products" />
        <ProductGrid />

        {/* Special Products */}
        <Section title="Our Special Products" />
        <ProductGrid special />

        {/* Subscribe */}
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
      </ScrollView>

      {/* Hamburger Menu (rendered ONCE outside ScrollView) */}
      {menuVisible && <HamburgerMenu onClose={() => setMenuVisible(false)} />}
    </View>
  );
}

// Section Component
type SectionProps = {
  title: string;
};

const Section = ({ title }: SectionProps) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity onPress={() => router.push('/product')}>
      <Text style={styles.viewAll}>View all →</Text>
    </TouchableOpacity>
  </View>
);

// Product Grid (updated with fixed alignment matching product.tsx)
const ProductGrid = ({ special }: { special?: boolean }) => {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [savedItems, setSavedItems] = useState<number[]>([]);
  
  const increaseRating = (index: number, defaultRating: number) => {
    setRatings((prev) => {
      const current = prev[index] ?? defaultRating;
      const next = current + 0.1;
      return {
        ...prev,
        [index]: next > 5.0 ? 5.0 : parseFloat(next.toFixed(1)),
      };
    });
  };

  const toggleSave = (index: number) => {
    setSavedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const data: ProductData[] = special
    ? [
        {
          title: '1L Marriage couple...',
          price: '₹399',
          originalPrice: '₹500',
          rating: '4.8',
          image: require('../../assets/images/special1.png'),
          subtitle: 'case of 24 bottles',
        },
        {
          title: '1L Marriage couple...',
          price: '₹80',
          originalPrice: '₹100',
          rating: '4.8',
          image: require('../../assets/images/special2.png'),
          subtitle: 'case of 24 bottles',
        },
        {
          title: '500ml Water Bottle',
          price: '₹80',
          originalPrice: '₹100',
          rating: '4.8',
          image: require('../../assets/images/special3.png'),
          subtitle: 'case of 24 bottles',
        },
        {
          title: '300ml Water Bottle',
          price: '₹240',
          originalPrice: '₹300',
          rating: '4.8',
          image: require('../../assets/images/special4.png'),
          subtitle: 'case of 24 bottles',
        },
      ]
    : [
        {
          title: '20L Water Can',
          price: '₹399',
          originalPrice: '₹500',
          rating: '4.8',
          image: require('../../assets/images/prod1.png'),
          subtitle: 'case of 24 bottles',
        },
        {
          title: '1L Water Bottle',
          price: '₹80',
          originalPrice: '₹100',
          rating: '4.8',
          image: require('../../assets/images/prod2.png'),
          subtitle: 'case of 24 bottles',
        },
        {
          title: '500ml Water Bottle',
          price: '₹80',
          originalPrice: '₹100',
          rating: '4.8',
          image: require('../../assets/images/prod3.png'),
          subtitle: 'case of 24 bottles',
        },
        {
          title: '2L Water Bottle',
          price: '₹240',
          originalPrice: '₹300',
          rating: '4.8',
          image: require('../../assets/images/prod4.png'),
          subtitle: 'case of 24 bottles',
        },
      ];

  return (
    <View style={styles.productGrid}>
      {data.map((item, idx) => (
        <View 
          key={idx} 
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <TouchableOpacity
              onPress={() => increaseRating(idx, parseFloat(item.rating))}
              style={styles.ratingContainer}
            >
              <FontAwesome name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>
                {(ratings[idx] ?? parseFloat(item.rating)).toFixed(1)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleSave(idx)}>
              <Image
                source={require('../../assets/icons/save-icon.png')}
                style={[
                  styles.iconLarge,
                  savedItems.includes(idx) && { tintColor: 'yellow' },
                ]}
              />
            </TouchableOpacity>
          </View>

          <Image source={item.image} style={styles.productImage} />

          <View style={styles.newbox}>
            <View style={styles.productTitleContainer}>
              <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
              {item.subtitle && (
                <Text style={styles.productSubtitle}>{item.subtitle}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.cartButton}>
              <Image source={require('../../assets/icons/cart-icon.png')} style={styles.iconRegularBlue} />
            </TouchableOpacity>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>
              <Image source={require('../../assets/icons/rupees-icon.png')} style={styles.rupeeIcon} />
              {item.price.replace('₹', '')} <Text style={styles.caseText}>Per case</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.buyButton} onPress={() => router.push('/(screen)/description')}>
            <Text style={styles.buyButtonText}>Buy now</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

// --- UPDATED STYLESHEET WITH FIXED ALIGNMENT FROM PRODUCT.TSX ---
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7FAFF',
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 16,
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: 4,
    fontFamily: 'Poppins',
    color: '#666',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    fontFamily: 'Poppins',
    color: '#333',
  },
  bannerContainer: {
    width: width - (16 * 2),
    height: 190,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: -10,
  },
  bannerImage: {
    width: '100%',
    height: '78%',
    position: 'absolute',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overlayContent: {
    paddingLeft: 20,
    paddingRight: 40,
    zIndex: 2,
  },
  bannerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'PoppinsBold',
  },
  pureText: {
    color: '#2196F3',
  },
  waterText: {
    color: '#000',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
    fontFamily: 'Poppins',
  },
  bannerDescription: {
    fontSize: 10,
    color: '#676767',
    marginVertical: 8,
    fontFamily: 'Poppins',
  },
  shopButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'flex-start',
    width: width * 0.27,
    marginBottom: 10,
    fontFamily: 'PoppinsBold',
  },
  shopButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 10,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 3,
    backgroundColor: 'rgba(25, 123, 203, 0.4)', 
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  categoryRowPadded: {
    flexDirection: 'row',
    marginBottom: 32,
    paddingHorizontal: 16, 
  },
  categoryContainer: {
    alignItems: 'center',
    width: (width / 4) + 16, 
    marginRight: 16, 
  },
  categoryImageContainer: {
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
  },
  categoryImage: {
    width: width / 4,
    height: 60,
    resizeMode: 'contain',
  },
  categoryLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    fontFamily: 'PoppinsBold',
  },
  viewAll: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  // FIXED ALIGNMENT STYLES MATCHING PRODUCT.TSX
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
    alignItems: 'flex-start',
  },
  card: {
    width: '48%',
    borderRadius: 12,
    padding: 2,
    marginBottom: 16,
    minHeight: 300, // Fixed minimum height for all cards
    justifyContent: 'space-between', // Distribute content evenly
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
    color: '#000',
    marginLeft: 2,
    fontWeight: '600',
    fontFamily: 'PoppinsBold',
  },
  productImage: {
    width: '100%',
    height: 160,
    resizeMode: 'contain',
  },
  newbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
    minHeight: 50, // Fixed height for title area
  },
  productTitleContainer: {
    flex: 1,
    paddingRight: 4,
    minHeight: 40, // Consistent height for title container
    justifyContent: 'flex-start',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'Poppins',
    lineHeight: 18,
    minHeight: 18, // Ensure consistent baseline height
  },
  productSubtitle: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'Poppins',
    marginTop: 2,
    lineHeight: 14,
    minHeight: 14, // Consistent subtitle height
  },
  priceContainer: {
    marginBottom: 12,
    minHeight: 24, // Fixed height for price container
    justifyContent: 'center',
  },
  productPrice: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'PoppinsBold',
  },
  caseText: {
    fontSize: 10,
    color: '#888',
    fontFamily: 'Poppins',
  },
  // FIXED BUY BUTTON STYLE MATCHING PRODUCT.TSX
  buyButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%',
    borderRadius: 6,
    height: 40, // Fixed height for consistent button alignment
    justifyContent: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'PoppinsBold',
  },
  cartButton: {
    padding: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscribeContainer: {
    width: width * 0.92,
    height: 190,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  iconLarge: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#666',
  },
  iconRegularBlue: {
    width: 30, 
    height: 23, 
    resizeMode: 'contain',
  },
  rupeeIcon: {
    width: 10, 
    height: 10, 
    resizeMode: 'contain',
    marginRight: 2, 
    marginBottom: 1, 
  },
});