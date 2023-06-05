import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import { RefreshControl, Modal, Button, StyleSheet, Text, View, Image, Share, TouchableHighlight, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const User = (props) => {

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
            getInfo();
        }, []);



    return (
        <View style={styles.container}>
            <View style={styles.herder}>
                    <Text style={{fontSize:20}}>Account</Text>
                    
                </View>
                <View style={styles.separator1}/>


                <View style={styles.contentContainer}> 
                    <ScrollView >
                        <View style={{marginHorizontal: 20}}>
                            <View style={{alignItems:"center", paddingTop: 20}}>
                                <Image style={{width:120, height:120, borderRadius: 100}} source={{uri: "https://bizweb.dktcdn.net/100/414/728/products/5-1.jpg?v=1670559516383"}}></Image>
                                <Text style= {{fontSize: 25, marginTop:10}}>{objU.name}</Text>
                            </View>

                            <TouchableOpacity onPress={()=>{props.navigation.navigate('Info')}} style={{ flexDirection: 'row', marginTop:60, marginBottom:20,alignItems:"center", justifyContent: 'space-between',}}>
                                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3076/3076343.png"}}/>
                                <View style={{marginLeft:40}}>
                                    <Text style={{fontSize: 20}}>Personal Info</Text>
                                    <Text style={{fontSize: 12}}>Fullname, Phone Number, Address</Text>
                                </View>
                                <Image style={{width:20, height:20, marginLeft: "auto"}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2889/2889731.png"}}/>
                            </TouchableOpacity>

                            <View style={styles.separator1}/>

                            <TouchableOpacity style={{ flexDirection: 'row', marginVertical:20 ,alignItems:"center", justifyContent: 'space-between',}}>
                                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2438/2438078.png"}}/>
                                <View style={{marginLeft:40}}>
                                    <Text style={{fontSize: 20}}>Password</Text>
                                    <Text style={{fontSize: 12}}>For safety change regularly</Text>
                                </View>
                                <Image style={{width:20, height:20, marginLeft: "auto"}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2889/2889731.png"}}/>
                            </TouchableOpacity>

                            <View style={styles.separator1}/>

                            <TouchableOpacity style={{ flexDirection: 'row', marginVertical:20 ,alignItems:"center", justifyContent: 'space-between',}}>
                                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/4021/4021708.png"}}/>
                                <View style={{marginLeft:40}}>
                                    <Text style={{fontSize: 20}}>Payment</Text>
                                    <Text style={{fontSize: 12}}>Credit Card information</Text>
                                </View>
                                <Image style={{width:20, height:20, marginLeft: "auto"}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2889/2889731.png"}}/>
                            </TouchableOpacity>

                            <View style={styles.separator1}/>

                            <TouchableOpacity style={{ flexDirection: 'row', marginVertical:20 ,alignItems:"center", justifyContent: 'space-between',}}>
                                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2961/2961948.png"}}/>
                                <View style={{marginLeft:40}}>
                                    <Text style={{fontSize: 20}}>Purchase List</Text>
                                    <Text style={{fontSize: 12}}>Yours shoping history</Text>
                                </View>
                                <Image style={{width:20, height:20, marginLeft: "auto"}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2889/2889731.png"}}/>
                            </TouchableOpacity>

                            <View style={styles.separator1}/>

                            <TouchableOpacity style={{ flexDirection: 'row', marginVertical:20 ,alignItems:"center", justifyContent: 'space-between'}}>
                                <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3095/3095583.png"}}/>
                                <View style={{marginLeft:40}}>
                                    <Text style={{fontSize: 20}}>Contact</Text>
                                    <Text style={{fontSize: 12}}>Email, Phone Number, Facebook</Text>
                                </View>
                                <Image style={{width:20, height:20, marginLeft: "auto"}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2889/2889731.png"}}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={{marginTop: 20,}} onPress={()=>{props.navigation.navigate('Login')}}>
                                <Text style={{ color: "red", alignSelf: "center"}}>LOG OUT</Text>
                            </TouchableOpacity>

                            


                            <View style={{height:30}}></View>

                        </View>
                        
                        
                    
                    </ScrollView>

                </View>
                    
                            

                <View style={styles.separator1}/>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Home')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1946/1946488.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 70}} onPress={()=>{props.navigation.navigate('Search')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3126/3126554.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 70}} onPress={()=>{props.navigation.navigate('Feedback')}}>
                        <Image style={{width:27, height:27}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2567/2567557.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 70}} onPress={()=>{props.navigation.navigate('User')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/64/64572.png"}}/>
                    </TouchableOpacity>       
                    
                </View>
        </View>
    );
}

export default User

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
    }
});