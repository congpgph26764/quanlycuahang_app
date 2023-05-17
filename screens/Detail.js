import { StatusBar } from 'expo-status-bar';
import React, {Component, useState,useRef, useEffect} from "react";
import { RefreshControl, Modal, Button, StyleSheet, Text, View, Image, Share, SafeAreaView, TouchableHighlight, Alert, TouchableOpacity, TextInput, Dimensions, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking} from 'react-native';

const Detail = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.herder}>

                    <TouchableOpacity style={{marginLeft: 30}} onPress={()=>{props.navigation.navigate('Home')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3114/3114883.png"}}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{marginLeft: 300}} onPress={()=>{props.navigation.navigate('Cart')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2832/2832495.png"}}/>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.separator1}/>


                <View style={styles.contentContainer}> 
                    <ScrollView >
                        <Image style={{width: "100%", height:400, marginTop:10}} source={{uri: "https://bizweb.dktcdn.net/100/414/728/products/5-1.jpg?v=1670559516383"}}></Image>
                        <View style={{marginHorizontal: 20, marginVertical: 20}}>
                            <Text style={{color: "#777777"}}>HOODIE</Text>
                            <Text style={{fontSize:20, marginTop:10}}>SMILEY FACE HOODIE</Text>
                            <Text style={{color: "#777777"}}>(100)</Text>

                            <Text style={{ marginTop:10, marginBottom:10}}>5000000 đ</Text>

                            <View style={styles.separator1}/>

                            <Text style={{ marginTop:10, marginBottom:10, fontSize:16}}>Product info</Text>

                            <Text style={{color: "#777777"}}>Chất liệu : Vải nỉ bông 300 GSM. Màu sắc : Đen, Ghi đậm, Xanh lá. Form dáng : Form Hoodie Regular. Cảm hứng thiết kế : Mặt trước in logo ClownZ cùng dòng chữ Smiley Face Brand, mặt sau in text ClownZ được thiết kế theo style gothic, đi kèm dòng chữ Stand for northside ở bên dưới. Công nghệ in ấn / thiết kế : in kéo lụa hiệu ứng nổi vân đá. Chi tiết đặc biệt : hình in có hiệu ứng nổi vân đặc biệt</Text>
                        </View>
                        
                    </ScrollView>
                    
                </View>
                    
                            

                <View style={styles.separator1}/>
                <View style={styles.footer}>
                    <View style={{display: 'flex', flexDirection: 'row',}}>
                        <TouchableOpacity>
                            <Text style={{backgroundColor:"#00CC99", paddingVertical: 20, paddingHorizontal: 30, color: "#fff"}}>Add to cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{backgroundColor:"#FF6633", paddingVertical: 20, paddingHorizontal: 100, color: "#fff"}}>Buy now</Text>
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
