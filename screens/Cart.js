import { StatusBar } from 'expo-status-bar';
import React, {Component, useState,useRef, useEffect} from "react";
import { RefreshControl, Modal, Button, StyleSheet, Text, View, Image, Share, SafeAreaView, TouchableHighlight, Alert, TouchableOpacity, TextInput, Dimensions, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking} from 'react-native';

const Cart = (props) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getCartData();
        setRefreshing(false);
        }, 2000);
    }, []);


    const [cartData, setCartData] = useState([]);
    const sortedCartItems = cartData.sort((a, b) => b.timestamp - a.timestamp);


  const getCartData = async () => {
    if (cartData.length > 0) {
        return;
      }
    try {
      const jsonCartData = await AsyncStorage.getItem('cartData');
      if (jsonCartData !== null) {
        const cartData = JSON.parse(jsonCartData);
        setCartData(cartData);
        console.log('Dữ liệu giỏ hàng:', cartData);
      }
    } catch (error) {
      console.log('Lỗi khi lấy dữ liệu giỏ hàng:', error);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const saveCartData = async(cartData) =>{
    try {
        const jsonCartData = JSON.stringify(cartData);
        await AsyncStorage.setItem('cartData', jsonCartData);
        console.log('Dữ liệu giỏ hàng đã được lưu trữ thành công');
        console.log(jsonCartData);
      } catch (error) {
        console.log('Lỗi khi lưu trữ dữ liệu giỏ hàng:', error);
      }
  }

  const removeFromCart = (index) => {
    Alert.alert(
        'Xác nhận',
        'Bạn có chắc chắn muốn xóa khỏi giỏ hàng?',
        [
          { text: 'Hủy', style: 'cancel' },
          {
            text: 'Đồng ý',
            onPress: () => {
                const updatedCartData = [...cartData];
                updatedCartData.splice(index, 1);
                saveCartData(updatedCartData);
                setCartData(updatedCartData);
            },
          },
        ],
        { cancelable: false }
      );
    
  };

  const increaseQuantity = (index) => {
    const updatedCartItems = [...cartData];
    if (updatedCartItems[index].quantityItem < updatedCartItems[index].quantity) {
        updatedCartItems[index].quantityItem += 1;
        setCartData(updatedCartItems);
    }
    
  };

  const decreaseQuantity = (index) => {
    const updatedCartItems = [...cartData];
    if (updatedCartItems[index].quantityItem > 1) {
        updatedCartItems[index].quantityItem -= 1;
        setCartData(updatedCartItems);
    }
    
  };

  const subTotalPrice = () => {
    let totalPrice = 0;
  
    for (const item of cartData) {
      totalPrice += item.price * item.quantityItem;
    }
  
    return totalPrice;
  };

  const subTotal = subTotalPrice();

  const shippingPrice = () => {
    let totalPrice = 0;
  
    if (subTotal<1000000) {
        totalPrice = 50000;
    }
  
    return totalPrice;
  };

  const shipping = shippingPrice();


  const calculateTotalPrice = () => {
    
    let totalPrice =  parseFloat(subTotal) + parseFloat(shipping);
  
    return totalPrice;
  };

  const total = calculateTotalPrice();

    const renderCartItems = () => {
        
        
          
      };

    return(
        <View style={styles.container}>

            <View style={styles.herder}>

            <TouchableOpacity style={{marginRight: "auto"}} onPress={()=>{props.navigation.navigate('Home')}}>
                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3114/3114883.png"}}/>
            </TouchableOpacity>

            <Text style={{fontSize:20, marginRight: "auto"}}>Cart</Text>

            </View>
            <View style={styles.separator1}/>


            <View style={styles.contentContainer}> 
                
                <SafeAreaView style={{marginTop:10, marginHorizontal: 20}}>
                <ScrollView style ={{height: "100%"}}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    {sortedCartItems.map((item, index) => {
                    return(
                        <View key={index}>
                          <TouchableOpacity style={{display: 'flex', flexDirection: 'row', marginVertical: 10, alignItems: "center", height: 120}}>
                            <Image style={{width:130, height:120}} source={{uri: item.image}}></Image>
                            <View style={{marginVertical:10, marginHorizontal: 20, width:150}}>
                                <Text numberOfLines={2} style={{fontSize:13}} >{item.name.toUpperCase()}</Text>
                                <Text numberOfLines={1} style={{fontSize:13, color: "#FF6633", marginVertical:5}} >{item.price} đ</Text>
                                <View style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}> 
                                    <Button onPress={() => increaseQuantity(index)} title='+'></Button>
                                    <Text style={{marginHorizontal:10}}> {item.quantityItem} </Text>
                                    <Button onPress={() => decreaseQuantity(index)} title='-'></Button>
                                </View>
                            </View>

                            <TouchableOpacity style={{marginLeft: "auto"}} onPress={() => removeFromCart(index)}>
                                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/4441/4441955.png"}}/>
                            </TouchableOpacity>
                            
                        </TouchableOpacity>
                        </View>
                    )

                        })
                    }
        
                    </ScrollView>  

                </SafeAreaView>

            </View>

                    

            <View style={styles.separator1}/>
            <View style={styles.footer}>
                <View style={{width: 250}}>
                    <Text>Subtotal: {subTotal} đ</Text>
                    <Text>Shipping: {shipping} đ</Text>
                    <Text style={{ fontSize: 17, marginTop:8}}>Total: {total} đ</Text>
                </View>
                <TouchableOpacity style={{marginLeft: "auto"}}>
                    <Text style={{backgroundColor:"#FF6633", paddingVertical: 20, paddingHorizontal: 30, color: "#fff"}}>Buy now</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

export default Cart

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
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#E6E6E6',
        marginTop: 20,
        marginBottom: 20,
    },
    user: {
        display: 'flex', 
        flexDirection: 'row',
    },
    content: {
        backgroundColor: "green",
    },
    interactive: {
        marginTop: 10,
        marginLeft: 15,
    },
    contentContainer: {
        flex: 1
    },
    footer: {
      height: 100,
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: 'space-between',
      paddingHorizontal: 20
    }
});