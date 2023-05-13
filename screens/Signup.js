import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import {Button, StyleSheet, Text, View, TextInput } from 'react-native';

const Signup = (props) => {

        return (
            <View style={styles.container}>
                <Text style={{fontSize: 48, lineHeight: 72, marginTop: 30, color:'#1877F2'}}>Hello!</Text>
                <Text style={{fontSize: 20,width:200, lineHeight: 30, color:"#4E4B66"}}>Signup to get Started</Text>
        
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 40, fontSize:14}}>
                    <Text >Username</Text>
                    <Text style={{color:"red", marginLeft: 5}}>*</Text>
                </View>
                <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>
        
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 16, fontSize:14}}>
                    <Text >Full Name</Text>
                    <Text style={{color:"red", marginLeft: 5}}>*</Text>
                </View>
                <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>
                
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 16, fontSize:14}}>
                    <Text >Password</Text>
                    <Text style={{color:"red", marginLeft: 5}}>*</Text>
                </View>
                <TextInput style={{marginTop:10, padding:10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6, marginBottom: 48}}
               secureTextEntry={true}></TextInput>
        
        
                <Button title='Signup'></Button>

                <View style={{display: 'flex', flexDirection: 'row', marginTop: 25, fontSize:14, alignSelf:"center"}}>
                    <Text >Already have an account ? </Text>
                    <Text style={{color:"#1877F2", marginLeft: 5}} onPress={()=>{props.navigation.navigate('Login')}}>Login</Text>
                </View>
            </View>
          );
}

export default Signup

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
    marginRight: 25,
  },
});
