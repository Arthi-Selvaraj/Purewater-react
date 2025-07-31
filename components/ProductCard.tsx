import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type ProductCardProps = {
  index: number;
  title: string;
  price: string;
  originalPrice: string;
  rating: number;
  subtitle?: string;
  image: any;
  isSaved: boolean;
  ratingValue: number;
  onRate: (index: number, defaultRating: number) => void;
  onSave: (index: number) => void;
};

export default function ProductCard({
  index,
  title,
  price,
  originalPrice,
  rating,
  subtitle,
  image,
  isSaved,
  ratingValue,
  onRate,
  onSave,
}: ProductCardProps) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <TouchableOpacity
          onPress={() => onRate(index, rating)}
          style={styles.ratingContainer}
        >
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{ratingValue.toFixed(1)}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onSave(index)}>
          <Image
            source={require('../assets/icons/save-icon.png')}
            style={[styles.iconLarge, isSaved && { tintColor: 'yellow' }]}
          />
        </TouchableOpacity>
      </View>

      <Image source={image} style={styles.productImage} />

      <View style={styles.newbox}>
        <View style={styles.productTitleContainer}>
          <Text style={styles.productTitle} numberOfLines={2}>{title}</Text>
          {subtitle && <Text style={styles.productSubtitle}>{subtitle}</Text>}
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Image
            source={require('../assets/icons/cart-icon.png')}
            style={styles.iconRegularBlue}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>
          <Image
            source={require('../assets/icons/rupees-icon.png')}
            style={styles.rupeeIcon}
          />
          {price.replace('₹', '')}
          <Text style={styles.caseText}> Per case</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => router.push('/(screen)/description')}
      >
        <Text style={styles.buyButtonText}>Buy now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: 12,
    padding: 2,
    marginBottom: 16,
    minHeight: 300,
    justifyContent: 'space-between',
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
  iconLarge: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#666',
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
    minHeight: 50,
  },
  productTitleContainer: {
    flex: 1,
    paddingRight: 4,
    minHeight: 40,
    justifyContent: 'flex-start',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'Poppins',
    lineHeight: 18,
    minHeight: 18,
  },
  productSubtitle: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'Poppins',
    marginTop: 2,
    lineHeight: 14,
    minHeight: 14,
  },
  priceContainer: {
    marginBottom: 12,
    minHeight: 24,
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
  buyButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%',
    borderRadius: 6,
    height: 40,
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
