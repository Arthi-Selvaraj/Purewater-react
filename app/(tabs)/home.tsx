import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
  Dimensions,
  Image,
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
import ProductCard from '../../components/ProductCard';
import { SPECIAL_PRODUCTS, POPULAR_PRODUCTS, BANNER_DATA, BASE_CATEGORIES } from '../../constants/products';
import { customFonts, fontFamily } from '../../utils/fonts';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [fontsLoaded] = useFonts(customFonts);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const scrollViewCategoriesRef = useRef<ScrollView>(null);

  if (!fontsLoaded) return null;


  const DUPLICATION_FACTOR = 50;
  const categories = Array(DUPLICATION_FACTOR).fill(BASE_CATEGORIES).flat();
  const SCROLLVIEW_HORIZONTAL_PADDING = 16;
  const ITEM_IMAGE_WIDTH = width / 4;
  const ITEM_CONTAINER_MARGIN_RIGHT = 16;
  const CATEGORY_VISIBLE_WIDTH = ITEM_IMAGE_WIDTH + ITEM_CONTAINER_MARGIN_RIGHT;
  const numberOfBaseItems = BASE_CATEGORIES.length;
  const centralSetOffset = numberOfBaseItems * CATEGORY_VISIBLE_WIDTH * Math.floor(DUPLICATION_FACTOR / 2);
  const initialScrollOffset = centralSetOffset;

  useEffect(() => {
    if (scrollViewCategoriesRef.current) {
      scrollViewCategoriesRef.current.scrollTo({ x: initialScrollOffset, animated: false });
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleMicPress = () => {
    console.log('Mic pressed');
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

  const handleBannerScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setActiveBannerIndex(currentIndex);
  };

  const increaseRating = (index: number, defaultRating: number, section: string) => {
    const key = `${section}-${index}`;
    setRatings((prev) => {
      const current = prev[key] ?? defaultRating;
      const next = current + 0.1;
      return {
        ...prev,
        [key]: next > 5.0 ? 5.0 : parseFloat(next.toFixed(1)),
      };
    });
  };

  const toggleSave = (index: number, section: string) => {
    const key = `${section}-${index}`;
    setSavedItems((prev) =>
      prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key]
    );
  };

  const renderBanner = () => (
    <>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleBannerScroll}
        scrollEventThrottle={200}
        onMomentumScrollEnd={handleBannerScroll}
      >
        {BANNER_DATA.map((banner, index) => (
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

      <View style={styles.dotsContainer}>
        {BANNER_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeBannerIndex === index && styles.activeDot
            ]}
          />
        ))}
      </View>
    </>
  );

  const renderCategories = () => (
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
  );

  const renderProductGrid = (products: typeof POPULAR_PRODUCTS, section: string) => (
    <View style={styles.productGrid}>
      {products.map((item, index) => (
        <ProductCard
          key={`${section}-${index}`}
          index={index}
          title={item.title}
          price={item.price}
          originalPrice={item.originalPrice}
          rating={parseFloat(item.rating)}
          subtitle={item.subtitle}
          image={item.image}
          isSaved={savedItems.includes(`${section}-${index}`)}
          ratingValue={ratings[`${section}-${index}`] ?? parseFloat(item.rating)}
          onRate={(idx, defaultRating) => increaseRating(idx, defaultRating, section)}
          onSave={(idx) => toggleSave(idx, section)}
        />
      ))}
    </View>
  );

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

        {/* Banner */}
        {renderBanner()}

        {/* Categories */}
        {renderCategories()}

        {/* Most Popular Products */}
        <Section title="Most Popular Products" />
        {renderProductGrid(POPULAR_PRODUCTS, 'popular')}

        {/* Special Products */}
        <Section title="Our Special Products" />
        {renderProductGrid(SPECIAL_PRODUCTS, 'special')}

        {/* Subscribe Section */}
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
      {menuVisible && <HamburgerMenu onClose={() => setMenuVisible(false)} />}
    </View>
  );
}

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
    fontFamily: fontFamily.regular,
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
    fontFamily: fontFamily.regular,
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
    fontFamily: fontFamily.bold,
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
    fontFamily: fontFamily.regular,
  },
  bannerDescription: {
    fontSize: 10,
    color: '#676767',
    marginVertical: 8,
    fontFamily: fontFamily.regular,
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
  },
  shopButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 10,
    textAlign: 'center',
    fontFamily: fontFamily.bold,
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
    fontFamily: fontFamily.regular,
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
    fontFamily: fontFamily.bold,
  },
  viewAll: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: fontFamily.regular,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
    alignItems: 'flex-start',
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
    fontFamily: fontFamily.bold,
  },
});