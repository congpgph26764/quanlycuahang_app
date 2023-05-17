import { StatusBar } from 'expo-status-bar';
import React, {Component, useState,useRef, useEffect} from "react";
import { RefreshControl, Modal, Button, StyleSheet, Text, View, Image, Share, SafeAreaView, TouchableHighlight, Alert, TouchableOpacity, TextInput, Dimensions, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking} from 'react-native';

const CART= [
    {
        id: '6426a323e027b4ed69c318db',
        name: "SMILEY FACE HOODIE",
        image: 'https://bizweb.dktcdn.net/100/414/728/products/5-1.jpg?v=1670559516383',
        price: 500000,
        quantity: 100,
        description: "Chất liệu : Vải nỉ bông 300 GSM. Màu sắc : Đen, Ghi đậm, Xanh lá. Form dáng : Form Hoodie Regular. Cảm hứng thiết kế : Mặt trước in logo ClownZ cùng dòng chữ Smiley Face Brand, mặt sau in text ClownZ được thiết kế theo style gothic, đi kèm dòng chữ Stand for northside ở bên dưới. Công nghệ in ấn / thiết kế : in kéo lụa hiệu ứng nổi vân đá. Chi tiết đặc biệt : hình in có hiệu ứng nổi vân đặc biệt"
      },
      {
        id: '6426bfa339e9e48b3ebb3ea1',
        name: "CLOWNZ EMBOSSING T-SHIRT",
        image: 'https://bizweb.dktcdn.net/100/414/728/products/1-8bf1535a-a88c-4bc8-b61e-3c35764f0314.jpg?v=1679297202317',
        price: 400000,
        quantity: 50,
        description: "",
      },
    
    
  ];

const Cart = (props) => {

    const [selectedId, setSelectedId] = useState();

    const Item = ({item, onPress, backgroundColor, textColor}) => (
        <TouchableOpacity onPress={onPress} style={{display: 'flex', flexDirection: 'row', marginVertical: 10, alignItems: "center"}}>
            <Image style={{width:130, height:120}} source={{uri: item.image}}></Image>
            <View style={{marginVertical:10, marginHorizontal: 20, width: 180, height:100}}>
                <Text numberOfLines={2} style={{fontSize:13}} >{item.name}</Text>
                <Text numberOfLines={1} style={{fontSize:13, color: "#FF6633", marginVertical:5}} >{item.price} đ</Text>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}> 
                    <Button title='+'></Button>
                    <Text style={{marginHorizontal:10}}> 123 </Text>
                    <Button title='-'></Button>
                </View>
            </View>

            <TouchableOpacity>
                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/4441/4441955.png"}}/>
            </TouchableOpacity>
            
        </TouchableOpacity>

      );

    const renderItem = ({item}) => {

        return (
          <Item
            item={item}
            onPress={() => setSelectedId(item.id)}
          />
        );
      };

    return(
        <View style={styles.container}>

            <View style={styles.herder}>

            <TouchableOpacity style={{marginLeft: 30}} onPress={()=>{props.navigation.navigate('Home')}}>
                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3114/3114883.png"}}/>
            </TouchableOpacity>

            <Text style={{fontSize:20, marginLeft: 130}}>Cart</Text>

            </View>
            <View style={styles.separator1}/>


            <View style={styles.contentContainer}> 
                
                <SafeAreaView style={{marginTop:10, marginHorizontal: 20}}>
                    <FlatList
                        data={CART}
                        keyExtractor={item => item.id}
                        extraData={selectedId}
                        renderItem={renderItem}
                    />        
                </SafeAreaView>

            </View>

                    

            <View style={styles.separator1}/>
            <View style={styles.footer}>
                <View style={{display: 'flex', flexDirection: 'row',}}>
                    <View style={{width: 250, marginLeft:10}}>
                        <Text>Total payment</Text>
                        <Text style={{fontSize: 17, color: "#FF6633"}}>1000000 đ</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={{backgroundColor:"#FF6633", paddingVertical: 20, paddingHorizontal: 30, color: "#fff"}}>Buy now</Text>
                    </TouchableOpacity>
                    
                </View>     

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
        alignItems: "center"
    }
});