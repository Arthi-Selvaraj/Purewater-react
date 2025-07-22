import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Feather from 'react-native-vector-icons/Feather';

export default function PaymentPage() {
  const [upiExpanded, setUpiExpanded] = useState(false);
  const router = useRouter();


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Feather name="arrow-left" size={22} color="#000" />
          <Text style={styles.pageTitle}>Payment</Text>
        </View>

        {/* Steps */}
        <View style={styles.stepsRow}>
          <View style={styles.stepCircle}><Text style={styles.stepText}>1</Text></View>
          <View style={styles.dottedLine} />
          <View style={styles.stepCircleInactive}><Text style={styles.stepTextInactive}>2</Text></View>
        </View>
        <View style={styles.stepsLabelRow}>
          <Text style={styles.activeStep}>Add Details</Text>
          <Text style={styles.inactiveStep}>Payment</Text>
        </View>

        {/* Address */}
        <View style={styles.addressBox}>
          <View style={styles.addressRow}>
            <Text style={styles.addressLabel}>Address</Text>
            <Image source={require('../../assets/icons/edit-icon.png')} style={styles.flagIcon} />
          </View>
          <Text style={styles.addressText}>123, D-A Block, ABC apartment, Coimbatore -64.</Text>
          <View style={styles.phoneHeaderRow}>
  <Text style={styles.addressLabel}>Phone Number</Text>
  <Image source={require('../../assets/icons/edit-icon.png')} style={styles.editIcon} />
</View>

<View style={styles.phoneRow}>
  <Image source={require('../../assets/icons/india-flag.png')} style={styles.flagIcon} />
  <Text style={styles.phoneText}>+91 99944 55666</Text>
</View>


          <TouchableOpacity style={styles.saveBtn}><Text style={styles.saveBtnText}>Save</Text></TouchableOpacity>
        </View>

        {/* Payment Options */}
        
<View style={styles.paymentBox}>
  <Text style={styles.paymentLabel}>Payment Option</Text>

          {/* UPI */}
          <View style={styles.optionBox}>
    <TouchableOpacity onPress={() => setUpiExpanded(!upiExpanded)} style={styles.optionRow}>
      <Text style={styles.optionText}>UPI</Text>
      <Feather name={upiExpanded ? 'chevron-up' : 'chevron-down'} size={18} color="#444" />
    </TouchableOpacity>

    {upiExpanded && (
      <>
        {[
          { label: 'Gpay', icon: require('../../assets/icons/google.png') },
          { label: 'Phonepe', icon: require('../../assets/icons/phonepe.png') },
          { label: 'BHIM', icon: require('../../assets/icons/bhim.png') },
        ].map((item, index) => (
          <View key={index} style={styles.optionBox}>
            <TouchableOpacity style={styles.optionRow}>
              <View style={styles.optionRowLeft}>
                <Image source={item.icon} style={styles.optionIcon} />
                <Text style={styles.optionText}>{item.label}</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#444" />
            </TouchableOpacity>
          </View>
        ))}
      </>
    )}
  </View>

          {/* Other Options */}
          {['Debit Card', 'Credit Cards', 'Net banking'].map((label, index) => (
    <View key={index} style={styles.optionBox}>
      <TouchableOpacity style={styles.optionRow}>
        <Text style={styles.optionText}>{label}</Text>
        <Feather name="chevron-right" size={18} color="#444" />
      </TouchableOpacity>
    </View>
  ))}
</View>

        {/* Subscribe Banner */}
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

      {/* Next Button */}
  <TouchableOpacity
  style={styles.nextButton}
  onPress={() => router.push('/(screen)/card-details')}
>
  <Text style={styles.nextText}>Next</Text>
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
    marginTop: 10,
  },
  stepText: {
  fontSize: 14,
  color: '#007BFF',
  fontWeight: '600',
},

  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleInactive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dottedLine: {
  width: 100,               // ⬅️ Increase total line length
  borderBottomWidth: 2,     // ⬅️ Thicker dashes
  borderStyle: 'dashed',
  borderColor: '#bbb',      // Slightly darker for visibility
  marginHorizontal: 20,
  marginTop:15,
},

pText: {
    color: '#007BFF',
  },
  stepTextInactive: {
    color: '#bbb',
  },
  stepsLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 6,
  },
  activeStep: {
    color: '#007BFF',
  },
  inactiveStep: {
    color: '#bbb',
  },
  addressBox: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  addressLabel: {
    fontWeight: '600',
    marginTop: 8,
  },
  addressText: {
  fontSize: 15,
  marginBottom: 10,
  color: '#bbb',
  width: '90%',
},
 phoneRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 10,
},

  flagIcon: {
    width: 24,
    height: 16,
    resizeMode: 'contain',
  },
  phoneText: {
  fontSize: 15,
  color: '#bbb',
  flex: 1,
  marginLeft: 8,
},
  saveBtn: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    marginTop: 6,
  },
  saveBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  paymentBox: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  paymentLabel: {
    fontWeight: '600',
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
  },
  optionBox: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 10,
  marginBottom: 10,
  backgroundColor: '#fff',
},

optionRowLeft: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
},

  subOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 8,
  },
  optionText: {
    fontSize: 15,
    color: '#333',
  },
  subOptions: {
    marginLeft: 8,
    paddingBottom: 10,
  },
  optionIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
    resizeMode: 'contain',
  },
  subscribeContainer: {
    width: '90%',
    height: 190,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    marginTop: 10,
  },
  bannerImage: {
    width: '100%',
    height: '78%',
    position: 'absolute',
    borderRadius: 8,
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
  },
  nextButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    margin: 16,
  },
  nextText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  phoneHeaderRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
},
editIcon: {
  width: 18,
  height: 16,
  resizeMode: 'contain',
},

});
