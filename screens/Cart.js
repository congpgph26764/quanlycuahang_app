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

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('cartData');
      setCartData([]);
      console.log('Dữ liệu cũ đã được xóa thành công.');
    } catch (error) {
      console.log('Lỗi khi xóa dữ liệu cũ:', error);
    }
  };

  const increaseQuantity = (index) => {
    const updatedCartItems = [...cartData];
    if (updatedCartItems[index].quantityItem < updatedCartItems[index].quantity) {
        updatedCartItems[index].quantityItem += 1;
        setCartData(updatedCartItems);
        saveCartData(updatedCartItems);
    }
    
  };

  const decreaseQuantity = (index) => {
    const updatedCartItems = [...cartData];
    if (updatedCartItems[index].quantityItem > 1) {
        updatedCartItems[index].quantityItem -= 1;
        setCartData(updatedCartItems);
        saveCartData(updatedCartItems);
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

  const [showModalDialog, setshowModalDialog] = useState (false);

    const toggleModal = () => {
        setshowModalDialog(!showModalDialog);
    };

    const HienModalCheckOut = () =>{
      if (cartData.length == 0) {
        alert("Giỏ hàng đang trống")
        return;
      }
        toggleModal();
    };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const options = ['Cash', 'PayPal (Updating)'];

  const handleOptionPress = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
  };


  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [idBill, setidBill] = useState();
  const total_price = total;
  const status = "Chờ xác nhận"
  const [note, setnote] = useState("");


  const getCurrentDate=()=>{
 
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return date + '-' + month + '-' + year;
  }

  const date = getCurrentDate();

  const doCheckOut = () =>{


    if (name.length == 0) {

        alert("Chưa nhập fullname")
        return;
    }
    if (email.length == 0) {

        alert("Chưa nhập email")
        return;
    }
    if (phone.length == 0) {

        alert("Chưa nhập phone number")
        return;
    }
    if (address.length == 0) {

      alert("Chưa nhập address")
      return;
    } 
    if (selectedValue.length == 0) {

      alert("Chưa chọn payment methods")
      return;
    } else if (selectedValue == 'PayPal (Updating)') {

      alert("Chức năng đang được update!\n Vui lòng chọn chức năng thanh toán khác")
      return;
    } 
    console.log(objU);


    let objBill = { idBill: idBill, name: name, email: email, phone: phone, address: address, date: date, total_price: total_price, payment_methods: selectedValue, status: status, note: note, id_user: objU._id };

    let url_bill = 'http://192.168.11.72:3000/api/bill/add';
    
    fetch(url_bill, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(objBill)
    })
        .then((res) => {
            if (res.status = 201){
                doAddDetailedBill();
                alert("Đặt hàng thành công!\n Chờ xác nhận của shop");
                clearData();
                console.log(objBill);
                props.navigation.navigate('Home')
            }else{
                alert("Đăt hàng không thành công");
            }
                
        })
        .catch((ex) => {
            console.log(ex);
        });
    }

    const getDataBill = () =>{
      let url_bill = 'http://192.168.11.72:3000/api/bill';
    
       fetch(url_bill)
             .then((res) => {
                 return res.json();
             })
             .then( (data) =>{

              let idCount = 1;
              
              data.forEach(i => {
                if (idCount<=i.idBill) {
                  idCount+=1;
                }
              });
              setidBill(idCount)
       })
    }

    const [objU, setobjU] = useState({});

    const getInfo = async ()=>{
      try {
          const value = await AsyncStorage.getItem('login')
          console.log("lấy dữ liệu " + value);
          if(value !== null) {
  
              setobjU ( JSON.parse(value) );
              
          }
        } catch(e) {
          console.log(e);
        }
        
    }

    React.useEffect(() => {
      getDataBill(),getInfo();
    }, []);



    const doAddDetailedBill= () =>{
      cartData.forEach(pro => {
        let data = {name: pro.name, price: pro.price, id_bill: idBill, quantity: pro.quantityItem}
      
      let url_bill = 'http://192.168.11.72:3000/api/detailed_bill/add';
    
      fetch(url_bill, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          
          body: JSON.stringify(data)
      })
          .then((res) => {
              if (res.status = 201){
                  console.log(data);
              }else{
                  console.log("Lấy data không thành công");
              }
                  
          })
          .catch((ex) => {
              console.log(ex);
          });

        });
    }

    return(
        <View style={styles.container}>

            <View>
                <Modal visible={showModalDialog}>
                  <ScrollView style={{marginTop:25}}>
                    <View style={st.modal_dialog_view}>

                        <View style={{alignItems:"center", marginTop: 40}}>
                            <Text style= {{fontSize: 20}}>Check Out</Text>
                        </View>

                        <View style={{display: 'flex', flexDirection: 'row', marginTop: 40, fontSize:14}}>
                        <Text >Full Name</Text>
                        </View>
                        <TextInput onChangeText={(txt)=>{setname(txt)}} placeholder='Full Name' style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>
                        
                        <View style={{display: 'flex', flexDirection: 'row', marginTop: 16, fontSize:14}}>
                            <Text >Email Address</Text>
                        </View>
                        <TextInput onChangeText={(txt)=>{setemail(txt)}} placeholder='Email Address' style={{marginTop:10, padding:10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>
                        
                        <View style={{display: 'flex', flexDirection: 'row', marginTop: 16, fontSize:14}}>
                            <Text >Phone Number</Text>
                        </View>
                        <TextInput onChangeText={(txt)=>{setphone(txt)}} placeholder='Phone Number' style={{marginTop:10, padding:10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>
                
                        <View style={{display: 'flex', flexDirection: 'row', marginTop: 16, fontSize:14}}>
                            <Text >Address</Text>
                        </View>
                        <TextInput onChangeText={(txt)=>{setaddress(txt)}} placeholder='Address' style={{marginTop:10, padding:10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>

                        <View style={{display: 'flex', flexDirection: 'row', marginTop: 40, fontSize:14}}>
                            <Text >List Products</Text>
                        </View>
                        
                        <SafeAreaView style={{marginTop:10}}>
                          <ScrollView
                              refreshControl={
                                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                              >
                              {sortedCartItems.map((item, index) => {
                              return(
                                  <View key={index}>
                                    <View style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}>
                                      <View style={{ width: 300}}>
                                          <Text numberOfLines={2} style={{fontSize:11}} >{item.name.toUpperCase()}</Text>
                                          <Text numberOfLines={1} style={{fontSize:11, color: "#FF6633", marginVertical:5}} >{item.price} đ</Text>
                                      </View>

                                      <Text style={{marginLeft:"auto"}}>{item.quantityItem}</Text>
                                  </View>
                                  <View style={styles.separator}/>
                                  </View>
                              )

                                  })
                              }
                  
                              </ScrollView>  

                            </SafeAreaView>

                          <View style={{display: 'flex', flexDirection: 'row', marginTop: 40, fontSize:14}}>
                            <Text >Subtotal</Text>
                            <Text style={{marginLeft:"auto"}}>{subTotal} đ</Text>
                          </View>
                          <View style={{display: 'flex', flexDirection: 'row', marginTop: 5, fontSize:14}}>
                            <Text >Shipping</Text>
                            <Text style={{marginLeft:"auto"}}>{shipping} đ</Text>
                          </View>
                          <View style={{display: 'flex', flexDirection: 'row', marginTop: 15, fontSize:14}}>
                            <Text >Total</Text>
                            <Text style={{marginLeft:"auto", color: "#FF6633"}}>{total} đ</Text>
                          </View>

                          <View style={{display: 'flex', flexDirection: 'row', marginTop: 40, fontSize:14}}>
                            <Text >Payment Methods</Text>
                          </View>
                          <TouchableOpacity
                              style={styles.dropDownContainer}
                              onPress={() => setIsOpen(!isOpen)}
                            >
                              <Text style={styles.selectedValue}>{selectedValue || 'Select an option'}</Text>
                            </TouchableOpacity>
                            {isOpen && (
                              <View style={styles.optionsContainer}>
                                {options.map((option) => (
                                  <TouchableOpacity
                                    key={option}
                                    style={styles.option}
                                    onPress={() => handleOptionPress(option)}
                                  >
                                    <Text style={{fontSize:13}}>{option}</Text>
                                  </TouchableOpacity>
                                ))}
                              </View>
                            )}

                          <View style={{display: 'flex', flexDirection: 'row', marginTop: 40, fontSize:14}}>
                            <Text >Notes</Text>
                          </View>
                          <TextInput onChangeText={(txt)=>{setnote(txt)}} placeholder='Note' style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>


                        <View style={{height:50}}></View>
                        <Button title="Check Out" onPress={doCheckOut}/>
                        <View style={{height:10}}></View>
                        <Button title="Cancel" onPress={ toggleModal}/>
                        <View style={{height:50}}></View>
                    </View> 
                    </ScrollView>
                </Modal>
            </View>

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
                    <Text style={{ marginTop:8, color: "#FF6633"}}>Total: {total} đ</Text>
                </View>
                <TouchableOpacity style={{marginLeft: "auto"}} onPress={HienModalCheckOut}>
                    <Text style={{backgroundColor:"#FF6633", paddingVertical: 20, paddingHorizontal: 30, color: "#fff"}}>Check Out</Text>
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
        marginVertical: 10
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
    },
    dropDownContainer: {
      marginTop: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
    },
    selectedValue: {
      fontSize: 13,
    },
    optionsContainer: {
      marginTop: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      shadowColor: 'rgba(0, 0, 0, 0.2)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 3,
    },
    option: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
    },
});

const st = StyleSheet.create({
  modal_dialog_view:{
      flex:1,
      marginLeft:20,
      marginRight:20
  }
})