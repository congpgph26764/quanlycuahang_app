import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import { RefreshControl, Modal, Button, StyleSheet, Text, View, Image, Share, TouchableHighlight, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const Feedback = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.herder}>
                    <Text style={{fontSize:20}}>Feedback</Text>
                    
                </View>
                <View style={styles.separator1}/>


                    <View style={styles.contentContainer}> 
                        <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, fontSize:14}}>
                            <Text >Full name</Text>
                            <Text style={{color:"red", marginLeft: 5}}>*</Text>
                        </View>
                        <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>

                        <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, fontSize:14}}>
                            <Text >Phone Number</Text>
                            <Text style={{color:"red", marginLeft: 5}}>*</Text>
                        </View>
                        <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>

                        <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, fontSize:14}}>
                            <Text >Email</Text>
                            <Text style={{color:"red", marginLeft: 5}}>*</Text>
                        </View>
                        <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>

                        <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, fontSize:14}}>
                            <Text >Comment</Text>
                            <Text style={{color:"red", marginLeft: 5}}>*</Text>
                        </View>
                        <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, marginBottom: 50, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>

                        <Button title='Send Feedback' onPress={()=>{props.navigation.navigate('Login')}}></Button>

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
                        <Image style={{width:27, height:27}} source={{uri:"https://cdn-icons-png.flaticon.com/128/665/665916.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 70}} onPress={()=>{props.navigation.navigate('User')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1144/1144760.png"}}/>
                    </TouchableOpacity>       
                    
                </View>
        </View>
    );
}

export default Feedback

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
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
    },
    footer: {
        padding: 15,
        flexDirection: 'row',
        display: 'flex', 
        alignSelf: "center",
        alignItems: "center"
    }
});