import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import { RefreshControl, FlatList, Modal, Button, SafeAreaView, StyleSheet, Text, View, Image, Share, TouchableHighlight, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import filter from 'lodash.filter';

const OderStatusSale = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.herder}>
                <Text style={{fontSize:20}}>Oder Status</Text>  
            </View>
                <View style={styles.separator1}/>


                <View style={styles.contentContainer}> 
                    <ScrollView >

                        <View style={{marginHorizontal: 20}}>


                            <TouchableOpacity style={{ flexDirection: 'row', marginTop:40 }} onPress={()=>{props.navigation.navigate('OrderSale',{status: 'Chờ xác nhận'})}}>
                                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2169/2169864.png"}}/>
                                <View style={{marginLeft:40}}>
                                    <Text style={{fontSize: 20}}>Chờ xác nhận</Text>
                                </View>
                                <Image style={{width:20, height:20, marginLeft: "auto"}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2889/2889731.png"}}/>
                            </TouchableOpacity >

                            <View style={styles.separator}/>

                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={()=>{props.navigation.navigate('OrderSale',{status: 'Chờ lấy hàng'})}}>
                                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2630/2630085.png"}}/>
                                <View style={{marginLeft:40}}>
                                    <Text style={{fontSize: 20}}>Chờ lấy hàng</Text>
                                </View>
                                <Image style={{width:20, height:20, marginLeft: "auto"}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2889/2889731.png"}}/>

                            </TouchableOpacity >

                            <View style={styles.separator}/>

                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={()=>{props.navigation.navigate('OrderSale',{status: 'Đang giao'})}}>
                                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/709/709790.png"}}/>
                                <View style={{marginLeft:40}}>
                                    <Text style={{fontSize: 20}}>Đang giao</Text>
                                </View>
                                <Image style={{width:20, height:20, marginLeft: "auto"}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2889/2889731.png"}}/>

                            </TouchableOpacity >

                            <View style={styles.separator}/>

                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={()=>{props.navigation.navigate('OrderSale',{status: 'Đã hoàn thành'})}}>
                                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2961/2961948.png"}}/>
                                <View style={{marginLeft:40}}>
                                    <Text style={{fontSize: 20}}>Đã hoàn thành</Text>
                                </View>
                                <Image style={{width:20, height:20, marginLeft: "auto"}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2889/2889731.png"}}/>

                            </TouchableOpacity >

                        </View>

                    </ScrollView>

                </View>
                    
                            

                <View style={styles.separator1}/>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('HomeSale')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1946/1946488.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 80}} onPress={()=>{props.navigation.navigate('OderStatusSale')}}>
                        <Image style={{width:27, height:27}} source={{uri:"https://cdn-icons-png.flaticon.com/128/665/665916.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 80}} onPress={()=>{props.navigation.navigate('ProfileSale')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1144/1144760.png"}}/>
                    </TouchableOpacity>       
                    
                </View>
        </View>
    );
}

export default OderStatusSale

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:20,
    },
    herder: {
        height: 70,
        display: 'flex', 
        flexDirection: 'row',
        alignItems: "center",
        alignSelf: "center"
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
    },
});
