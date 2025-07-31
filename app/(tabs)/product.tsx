import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesome, Ionicons, Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import ProductCard from '../../components/ProductCard';
import { customFonts, fontFamily } from '../../utils/fonts';
import { 
  PRODUCT_CATEGORIES, 
  CAN_PRODUCTS, 
  BOTTLE_PRODUCTS, 
  PRODUCT_SPECIAL_PRODUCTS 
} from '../../constants/productScreen';

const { width } = Dimensions.get('window');

export default function ProductScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts(customFonts);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [savedItems, setSavedItems] = useState<string[]>([]);

  if (!fontsLoaded) return null;

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

  const renderProductGrid = (products: typeof CAN_PRODUCTS, section: string) => (
    <View style={styles.grid}>
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <Ionicons name="menu" size={24} color="#000" />
      </View>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#888" />
        <TextInput placeholder="Search..." style={styles.searchInput} />
        <Feather name="mic" size={18} color="#888" />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
        {PRODUCT_CATEGORIES.map((cat, i) => (
          <View key={i} style={styles.categoryContainer}>
            <View style={styles.categoryImageContainer}>
              <Image source={cat.image} style={styles.categoryImage} />
            </View>
            <Text style={styles.categoryText}>{cat.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Can Products */}
      <Text style={styles.sectionTitle}>Can Products</Text>
      {renderProductGrid(CAN_PRODUCTS, 'can')}

      {/* Bottle Products */}
      <Text style={styles.sectionTitle}>Bottle Products</Text>
      {renderProductGrid(BOTTLE_PRODUCTS, 'bottle')}

      {/* Special Products */}
      <Text style={styles.sectionTitle}>Our Special Products</Text>
      {renderProductGrid(PRODUCT_SPECIAL_PRODUCTS, 'special')}

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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7FAFF',
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 16,
  },
  backButton: { 
    padding: 4 
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: fontFamily.bold,
    flex: 1,
    textAlign: 'center',
    marginRight: 200,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 44,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
    fontFamily: fontFamily.regular,
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryContainer: {
    alignItems: 'center',
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
  categoryText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    fontFamily: fontFamily.regular,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: fontFamily.bold,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  subscribeContainer: {
    width: width * 0.92,
    height: 190,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
    position: 'relative',
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
});