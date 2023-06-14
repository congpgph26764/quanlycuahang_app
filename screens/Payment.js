import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const PaymentScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handlePayment = () => {
    
    const payload = {
        amount: 100,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
      };
  };

  return (
    <View style={styles.container}>
        <View style={styles.herder}>
            <TouchableOpacity style={{marginRight:"auto"}}  onPress={()=>{navigation.goBack()}}>
                    <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3114/3114883.png"}}/>
                </TouchableOpacity>
            <Text style={{fontSize:20, marginRight:"auto"}}>Load Money</Text>  
        </View>

        <View style={styles.separator1}/>

        <View style={styles.contentContainer}> 

            <Text style={styles.label}>Số tiền</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập số tiền cần thanh toán"
                keyboardType="numeric"
                value={amount}
                onChangeText={text => setAmount(text)}
            />
            <Text style={styles.label}>Số thẻ</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập số thẻ thanh toán"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={text => setCardNumber(text)}
            />
            <View style={styles.inlineInputs}>
                <View style={styles.inlineInputContainer}>
                <Text style={styles.label}>Ngày hết hạn</Text>
                <TextInput
                    style={styles.inlineInput}
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    value={expiryDate}
                    onChangeText={text => setExpiryDate(text)}
                />
                </View>
                <View style={styles.inlineInputContainer}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                    style={styles.inlineInput}
                    placeholder="CVV"
                    keyboardType="numeric"
                    value={cvv}
                    onChangeText={text => setCVV(text)}
                />
                </View>
            </View>
            <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
                <Text style={styles.buttonText}>Thanh toán</Text>
            </TouchableOpacity>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
  },
  herder: {
    height: 70,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 20
    },
    separator1: {
        height: 1,
        width: '100%',
        backgroundColor: '#E6E6E6',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginVertical:20,
    },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inlineInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inlineInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  inlineInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  paymentButton: {
    backgroundColor: '#55c4ff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentScreen;
