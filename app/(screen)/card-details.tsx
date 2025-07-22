import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Feather from 'react-native-vector-icons/Feather';

export default function CardDetails() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Feather name="arrow-left" size={22} color="#000" onPress={() => router.back()} />
          <Text style={styles.pageTitle}>Payment</Text>
        </View>

        {/* Stepper */}
        <View style={styles.stepsRow}>
          <View style={styles.stepCircleActive}><Text style={styles.stepText}>1</Text></View>
          <View style={styles.stepLine} />
          <View style={styles.stepCircle}><Text style={styles.stepTextInactive}>2</Text></View>
        </View>
        <View style={styles.stepsLabelRow}>
          <Text style={styles.activeStep}>Add Details</Text>
          <Text style={styles.inactiveStep}>Payment</Text>
        </View>

        {/* Address Box */}
        <View style={styles.addressBox}>
          <View style={styles.rowBetween}>
            <Text style={styles.addressLabel}>Address</Text>
            <Image source={require('../../assets/icons/edit-icon.png')} style={styles.editIcon} />
          </View>
          <Text style={styles.addressText}>123, D-A Block, ABC apartment, Coimbatore -64.</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.addressLabel}>Phone Number</Text>
            <Image source={require('../../assets/icons/edit-icon.png')} style={styles.editIcon} />
          </View>
          <View style={styles.phoneRow}>
            <Image source={require('../../assets/icons/india-flag.png')} style={styles.flagIcon} />
            <Text style={styles.phoneText}>+91 99944 55666</Text>
          </View>
        </View>

        {/* Card Summary Box */}
        <View style={styles.cardBox}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardHolder}>David Wilson</Text>
            <Image source={require('../../assets/icons/mastercard.png')} style={styles.cardLogo} />
          </View>
          <Text style={styles.cardLabel}>CARD NUMBER</Text>
          <Text style={styles.cardNumber}>9988 98XX XXXX XX</Text>
          <View style={styles.cardInfoRow}>
            <View>
              <Text style={styles.cardLabel}>MONTH/YEAR</Text>
              <Text style={styles.cardValue}>01/23</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>CVV</Text>
              <Text style={styles.cardValue}>XXX</Text>
            </View>
          </View>
        </View>

        {/* Card Input */}
        <View style={styles.formBox}>
          <Text style={styles.inputLabel}>Card holder name</Text>
          <TextInput style={styles.input} placeholder="Name" />

          <Text style={styles.inputLabel}>Card Number</Text>
          <TextInput style={styles.input} placeholder="Number" keyboardType="numeric" />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Expire month</Text>
              <TextInput style={styles.input} placeholder="Month" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.inputLabel}>Cvv</Text>
              <TextInput style={styles.input} placeholder="Number" secureTextEntry />
            </View>
          </View>

          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.payNowBtn}
              onPress={()=>router.push('/(screen)/PaymentSuccess')}
>
        <Text style={styles.payNowText}>Pay now</Text>
        
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FBFF',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLine: {
    width: 50,
    height: 2,
    backgroundColor: '#007BFF',
    marginHorizontal: 8,
  },
  stepText: {
    color: 'green',
  },
  stepTextInactive: {
    color: '#007BFF',
  },
  stepsLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  activeStep: {
    color: 'green',
    fontWeight: '600',
  },
  inactiveStep: {
    color: '#007BFF',
  },
  addressBox: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  addressLabel: {
    fontWeight: '600',
    marginBottom: 4,
    fontSize: 15,
  },
  addressText: {
    color: '#444',
    marginBottom: 10,
    fontSize: 14,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flagIcon: {
    width: 24,
    height: 16,
    resizeMode: 'contain',
  },
  phoneText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  cardBox: {
    backgroundColor: '#D6ECFF',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
    borderColor: '#3399FF',
    borderWidth: 1,
  },
  cardHolder: {
    fontSize: 16,
    fontWeight: '900',
  },
  cardLabel: {
    fontSize: 10,
    color: '#333',
    marginTop: 12,
  },
  cardNumber: {
    fontSize: 16,
    marginTop: 4,
  },
  cardInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  cardLogo: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
  },
  formBox: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 10,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#007BFF',
    paddingVertical: 4,
    marginBottom: 12,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveBtn: {
    backgroundColor: '#007BFF',
    padding: 14,
    marginTop: 10,
    borderRadius: 6,
  },
  saveBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  payNowBtn: {
    backgroundColor: '#007BFF',
    padding: 16,
    margin: 16,
    borderRadius: 6,
  },
  payNowText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});