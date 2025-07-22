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
  ImageSourcePropType,
} from 'react-native';
import { FontAwesome, Ionicons, Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');

interface CategoryItem {
  name: string;
  image: ImageSourcePropType;
}

interface ProductItem {
  name: string;
  image: ImageSourcePropType;
  price: string;
  rating?: string;
}

const categories: CategoryItem[] = [
  { name: '20L Can', image: require('../../assets/images/can1.png') },
  { name: '500ml Bottle', image: require('../../assets/images/can2.png') },
  { name: '1L Bottle', image: require('../../assets/images/can3.png') },
];

const canProducts: ProductItem[] = [
  { name: '20L Water Can', image: require('../../assets/images/prod1.png'), price: '₹399', rating: '4.8' },
  { name: '10L Water Can', image: require('../../assets/images/prod2.png'), price: '₹80', rating: '4.8' },
  { name: '5L Water Can', image: require('../../assets/images/prod3.png'), price: '₹80', rating: '4.8' },
];

const bottleProducts: ProductItem[] = [
  { name: '2L Water Bottle', image: require('../../assets/images/prod4.png'), price: '₹399', rating: '4.8' },
  { name: '1L Water Bottle', image: require('../../assets/images/prod4.png'), price: '₹80', rating: '4.8' },
  { name: '500ml Water Bottle', image: require('../../assets/images/prod4.png'), price: '₹80', rating: '4.8' },
  { name: '300ml Water Bottle', image: require('../../assets/images/prod4.png'), price: '₹80', rating: '4.8' },
  { name: '250ml Water Bottle', image: require('../../assets/images/prod4.png'), price: '₹80', rating: '4.8' },
];

const specialProducts: ProductItem[] = [
  { name: '1L Marriage couple...', image: require('../../assets/images/special1.png'), price: '₹399', rating: '4.8' },
  { name: '1L Marriage couple...', image: require('../../assets/images/special2.png'), price: '₹80', rating: '4.8' },
  { name: '500ml Water Bottle', image: require('../../assets/images/special3.png'), price: '₹80', rating: '4.8' },
  { name: '300ml Water Bottle', image: require('../../assets/images/special4.png'), price: '₹240', rating: '4.8' },
];

export default function ProductScreen() {
  const router = useRouter();
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [savedItems, setSavedItems] = useState<{ [key: number]: boolean }>({});

  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

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
    setSavedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isBottleTypeProduct = (item: ProductItem, fromBottleList = false): boolean => {
    return fromBottleList || item.name.toLowerCase().includes('water bottle');
  };

  const renderProduct = (
    item: ProductItem,
    index: number,
    fromBottleList = false
  ) => (
    <View key={index} style={styles.card}>
      <View style={styles.cardHeader}>
        <TouchableOpacity
          onPress={() => increaseRating(index, parseFloat(item.rating || '4.8'))}
          style={styles.ratingContainer}
        >
          <FontAwesome name="star" size={18} color="#FFD700" />
          <Text style={styles.rating}>
            {(ratings[index] ?? parseFloat(item.rating || '4.8')).toFixed(1)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleSave(index)}>
          <Image
            source={require('../../assets/icons/save-icon.png')}
            style={[
              styles.iconRegular,
              savedItems[index] && { tintColor: 'yellow' },
            ]}
          />
        </TouchableOpacity>
      </View>

      <Image source={item.image} style={styles.productImage} />

      <View style={styles.newbox}>
        <View style={{ flex: 1 }}>
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          {isBottleTypeProduct(item, fromBottleList) && (
            <Text style={styles.caseSubText}>Case of 24 bottles</Text>
          )}
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Image
            source={require('../../assets/icons/cart-icon.png')}
            style={styles.iconRegularBlue}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>
          <Image
            source={require('../../assets/icons/rupees-icon.png')}
            style={styles.rupeeIcon}
          />
          {item.price.replace('₹', '')}{' '}
          <Text style={styles.perCase}>Per case</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.buyNowBtn}
        onPress={() => router.push('/(screen)/description')}
      >
        <Text style={styles.buyNowText}>Buy now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <Ionicons name="menu" size={24} color="#000" />
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#888" />
        <TextInput placeholder="Search..." style={styles.searchInput} />
        <Feather name="mic" size={18} color="#888" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
        {categories.map((cat, i) => (
          <View key={i} style={styles.categoryContainer}>
            <View style={styles.categoryImageContainer}>
              <Image source={cat.image} style={styles.categoryImage} />
            </View>
            <Text style={styles.categoryText}>{cat.name}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Can Products</Text>
      <View style={styles.grid}>
        {canProducts.map((item, index) => renderProduct(item, index))}
      </View>

      <Text style={styles.sectionTitle}>Bottle Products</Text>
      <View style={styles.grid}>
        {bottleProducts.map((item, index) => renderProduct(item, index, true))}
      </View>

      <Text style={styles.sectionTitle}>Our Special Products</Text>
      <View style={styles.grid}>
        {specialProducts.map((item, index) => renderProduct(item, index))}
      </View>

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
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'PoppinsBold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    borderRadius: 12,
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
    fontSize: 13,
    color: '#333',
    marginLeft: 4,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  iconRegular: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#000',
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
  newbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  cartButton: {
    padding: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: 160,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'Poppins',
  },
  caseSubText: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'Poppins',
    marginTop: 2,
  },
  priceContainer: {
    marginBottom: 12,
  },
  productPrice: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'PoppinsBold',
  },
  perCase: {
    fontSize: 10,
    color: '#888',
    fontFamily: 'Poppins',
  },
  buyNowBtn: {
    marginTop: 10,
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
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
    fontFamily: 'PoppinsBold',
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
