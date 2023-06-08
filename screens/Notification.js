import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import { RefreshControl, FlatList, Modal, Button, SafeAreaView, StyleSheet, Text, View, Image, Share, TouchableHighlight, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import filter from 'lodash.filter';

const Notification = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={styles.herder}>
                    <TouchableOpacity style={{marginRight: "auto"}}  onPress={()=>{navigation.goBack()}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3114/3114883.png"}}/>
                    </TouchableOpacity>

                    <Text style={{fontSize:20, marginRight:"auto"}}>Notification</Text>
                    
                </View>
                <View style={styles.separator1}/>


                <View style={styles.contentContainer}> 
                    <ScrollView >

                        <View style={{marginHorizontal: 20}}>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop:40, marginBottom: 70,alignItems:"center", justifyContent: 'space-between',}}>
                                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/4922/4922073.png"}}/>
                                <View style={{marginLeft:40}}>
                                    <Text style={{fontSize: 20}}>Blog</Text>
                                </View>
                                <Image style={{width:20, height:20, marginLeft: "auto"}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2889/2889731.png"}}/>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={()=>{navigation.navigate('OrderStatus',{status: 'Chờ xác nhận'})}}>
                                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2169/2169864.png"}}/>
                                <View style={{marginLeft:40}}>
                                    <Text style={{fontSize: 20}}>Chờ xác nhận</Text>
                                </View>
                                <Image style={{width:20, height:20, marginLeft: "auto"}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2889/2889731.png"}}/>
                            </TouchableOpacity >

                            <View style={styles.separator}/>

                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={()=>{navigation.navigate('OrderStatus',{status: 'Chờ lấy hàng'})}}>
                                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2630/2630085.png"}}/>
                                <View style={{marginLeft:40}}>
                                    <Text style={{fontSize: 20}}>Chờ lấy hàng</Text>
                                </View>
                                <Image style={{width:20, height:20, marginLeft: "auto"}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2889/2889731.png"}}/>

                            </TouchableOpacity >

                            <View style={styles.separator}/>

                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={()=>{navigation.navigate('OrderStatus',{status: 'Đang giao'})}}>
                                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/709/709790.png"}}/>
                                <View style={{marginLeft:40}}>
                                    <Text style={{fontSize: 20}}>Đang giao</Text>
                                </View>
                                <Image style={{width:20, height:20, marginLeft: "auto"}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2889/2889731.png"}}/>

                            </TouchableOpacity >

                        </View>

                    </ScrollView>

                </View>
                    
                            

                <View style={styles.separator1}/>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1946/1946436.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 70}} onPress={()=>{navigation.navigate('Search')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3126/3126554.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 70}} onPress={()=>{navigation.navigate('Feedback')}}>
                        <Image style={{width:27, height:27}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2567/2567557.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 70}} onPress={()=>{navigation.navigate('User')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1144/1144760.png"}}/>
                    </TouchableOpacity>       
                    
                </View>
        </View>
    );
}

export default Notification

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
        padding: 15,
        flexDirection: 'row',
        display: 'flex', 
        alignSelf: "center",
        alignItems: "center"
    },
});
