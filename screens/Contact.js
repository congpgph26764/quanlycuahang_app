import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import { RefreshControl, FlatList, Modal, Button, Linking, SafeAreaView, StyleSheet, Text, View, Image, Share, TouchableHighlight, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import filter from 'lodash.filter';

const Contact = ({navigation}) => {

    const handleEmailPress = () => {
        Linking.openURL('mailto:phamgiacong1912003@gmail.com');
      };
    
      const handlePhonePress = () => {
        Linking.openURL('tel:0985740301');
      };
    
      const handleFacebookPress = () => {
        Linking.openURL('https://www.facebook.com/cong.phamgia.37');
      };

    return (
        <View style={styles.container}>
            <View style={styles.herder}>
                <TouchableOpacity style={{marginRight:"auto"}}  onPress={()=>{navigation.goBack()}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3114/3114883.png"}}/>
                    </TouchableOpacity>

                    <Text style={{fontSize:20, marginRight:"auto"}}>Contact</Text>  
            </View>
                <View style={styles.separator1}/>


                <View style={styles.contentContainer}> 
                    <ScrollView >
                        <View style ={{paddingHorizontal: 20,}}>                        
                            <Text style={{fontSize:50, alignSelf:"center", marginVertical: 40}}>PRADA</Text>
                            <Text style={styles.title}>Cửa hàng PRADA</Text>
                            <Text style={styles.description}>
                                Chào mừng bạn đến với cửa hàng PRADA! Chúng tôi cung cấp các sản phẩm chất lượng cao và dịch vụ tuyệt vời. Hãy khám phá cửa hàng của chúng tôi ngay bây giờ!
                            </Text>
                            
                            <TouchableOpacity style={styles.contactButton} onPress={handleEmailPress}>
                                <Text style={styles.contactButtonText}>Email: phamgiacong1912003@gmail.com</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.contactButton} onPress={handlePhonePress}>
                                <Text style={styles.contactButtonText}>Phone Number: 0985740301</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.contactButton} onPress={handleFacebookPress}>
                                <Text style={styles.contactButtonText}>Facebook: facebook.com/cong.phamgia.37</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </View>
                    
                            

                <View style={styles.separator1}/>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1946/1946488.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 70}} onPress={()=>{navigation.navigate('Search')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3126/3126554.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 70}} onPress={()=>{navigation.navigate('Feedback')}}>
                        <Image style={{width:27, height:27}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2567/2567557.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 70}} onPress={()=>{navigation.navigate('User')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/64/64572.png"}}/>
                    </TouchableOpacity>    
                    
                </View>
        </View>
    );
}

export default Contact

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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      description: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20,
      },
      contactButton: {
        backgroundColor: '#55c4ff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
      },
      contactButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});