import { StatusBar } from 'expo-status-bar';
import React, {Component, useState,useRef, useEffect} from "react";
import { RefreshControl, Modal, Button, StyleSheet, Text, View, Image, Share, SafeAreaView, TouchableHighlight, Alert, TouchableOpacity, TextInput, Dimensions, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Detail = ({route, navigation }) => {
    const { id,name,description,id_category, price, image, image1, image2, quantity, status } = route.params;

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const images = [
        { id: 1, url: image },
        { id: 2, url: image1 },
        { id: 3, url: image2 },
      ];


    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        getCartData();
      }, []);


      const getCartData = async () => {
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

   

      const renderItem = ({ item, index }) => {
        return (
          <TouchableOpacity onPress={() => setSelectedImageIndex(index)}>
            <Image
              source={{ uri: item.url }}
              style={{ width: 80, height: 80, borderRadius: 5, marginHorizontal: 5 }}
            />
          </TouchableOpacity>
        );
      };


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

      const addToCart = (product) => {
        const newProduct = { ...product, timestamp: Date.now() };
        saveCartData([newProduct,...cartData,]);
        alert("Thêm vào giỏ hàng thành công");
        navigation.navigate("Cart")
      };
    
    return(
        <View style={styles.container}>
            <View style={styles.herder}>

                    <TouchableOpacity style={{marginLeft: 30}} onPress={()=>{navigation.goBack()}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3114/3114883.png"}}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{marginLeft: 300}} onPress={()=>{navigation.navigate('Cart')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2832/2832495.png"}}/>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.separator1}/>


                <View style={styles.contentContainer}> 
                    <ScrollView >
                        

                        <View>
                            
                            <Image
                                source={{ uri: images[selectedImageIndex].url }}
                                style={{ width: Dimensions.get('window').width, height: 400 }}
                            />
                            <Carousel
                                data={images}
                                renderItem={renderItem}
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={80}
                                onSnapToItem={(index) => setSelectedImageIndex(index)}
                            />
                        </View>

                        <View style={{marginHorizontal: 20, marginVertical: 20}}>
                            <Text style={{fontSize:20, marginTop:10}}>{name.toUpperCase()}</Text>

                            <Text style={{ marginTop:10, marginBottom:10}}>{price} đ</Text>

                            <View style={styles.separator1}/>

                            <Text style={{ marginTop:10, marginBottom:10, fontSize:16}}>Product info</Text>

                            <Text style={{color: "#777777"}}>{description}</Text>
                        </View>
                        
                    </ScrollView>
                    
                </View>
                    
                            

                <View style={styles.separator1}/>
                <View style={styles.footer}>
                    <View style={{display: 'flex', flexDirection: 'row',}}>
                        <TouchableOpacity style={{marginRight:15}}>
                            <Text style={{paddingVertical: 20, paddingHorizontal: 30, borderColor:"#000", borderWidth: 1}}>Size: Oversize</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => addToCart({ id,name,description,id_category, price, image, image1, image2, quantity, status, quantityItem: 1 })}>
                            <Text style={{backgroundColor:"#FF6633", paddingVertical: 20, paddingHorizontal: 70, color: "#fff"}}>Add to cart</Text>
                        </TouchableOpacity>
                        
                    </View>     
                    
                </View>
        </View>
    );
}

export default Detail

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop:20,
    },
    herder: {
        height: 70,
        display: 'flex', 
        flexDirection: 'row',
        alignItems: "center"
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
        padding: 15,
        
        flexDirection: 'row',
        display: 'flex', 
        alignSelf: "center",
        alignItems: "center"
    }
});
