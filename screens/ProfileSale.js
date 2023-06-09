import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import { RefreshControl, FlatList, Modal, Button, SafeAreaView, StyleSheet, Text, View, Image, Share, TouchableHighlight, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import filter from 'lodash.filter';

const ProfileSale = (props) => {

    const [objSale, setobjSale] = useState({});
    
    const getInfo = async ()=>{
        try {
            const value = await AsyncStorage.getItem('loginsale')
            console.log("lấy dữ liệu " + value);
            if(value !== null) {
    
                setobjSale ( JSON.parse(value) );
                
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
                <Text style={{fontSize:20}}>Profile</Text>  
            </View>
                <View style={styles.separator1}/>


                <View style={styles.contentContainer}> 
                    <ScrollView >
                        <View style={{marginTop: 30, flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                    
                            <Image
                                source={{ uri: 'https://bizweb.dktcdn.net/100/414/728/products/5-1.jpg?v=1670559516383' }}
                                style={styles.profileImage}
                            />
                            <Text style={styles.name}>{objSale.name}</Text>
                            <Text style={styles.bio}>Email: {objSale.email}</Text>
                            <Text style={styles.location}>Phone: {objSale.phone}</Text>
                            <Text style={styles.location}>Address: {objSale.address}</Text>

                            <View style={{height:30}}></View>

                            <TouchableOpacity style={{marginTop: 20,}} onPress={()=>{props.navigation.navigate('Login')}}>
                                <Text style={{ color: "red", alignSelf: "center"}}>LOG OUT</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>

                </View>
                    
                            

                <View style={styles.separator1}/>
                <View style={styles.footer}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('HomeSale')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1946/1946488.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 80}} onPress={()=>{props.navigation.navigate('OderStatusSale')}}>
                        <Image style={{width:27, height:27}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2567/2567557.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 80}} onPress={()=>{props.navigation.navigate('ProfileSale')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/64/64572.png"}}/>
                    </TouchableOpacity>       
                    
                </View>
        </View>
    );
}

export default ProfileSale

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
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
      },
      name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      bio: {
        fontSize: 18,
        marginBottom: 10,
      },
      location: {
        fontSize: 16,
        color: 'gray',
      },
});