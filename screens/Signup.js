import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import {Button, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';

const Signup = (props) => {

    const [fullname, setfullname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [address, setaddress] = useState("");
    const [phone, setphone] = useState("");

    const [acc, setAcc] = useState([]);

    const getData = () =>{
        let url_cat = 'http://192.168.100.9:3000/api/users';
      
         fetch(url_cat)
               .then((res) => {
                   return res.json();
               })
               .then( (data) =>{
                setAcc(data);
               })
      }

    const doSignup = () =>{


        if (fullname.length == 0) {

            alert("Chưa nhập fullname")
            return;
        }
        if (email.length == 0) {

            alert("Chưa nhập email")
            return;
        }
        if (password.length == 0) {

            alert("Chưa nhập password")
            return;
        }
        if (address.length == 0) {

            alert("Chưa nhập address")
            return;
        }
        if (phone.length == 0) {

            alert("Chưa nhập phone number")
            return;
        }

        let emailacc = 0;

        acc.forEach(i => {
            if (email == i.email) {
                emailacc = 1;
            }
        });

        if (emailacc==1) {
            alert("Email đã được sử dụng")
            return;
        }


        let objU = { name: fullname, role: "User", email: email, phone: phone, password: password, address: address };

        let url_users = 'http://192.168.100.9:3000/api/users/add';
        
        fetch(url_users, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(objU)
        })
            .then((res) => {
                if (res.status = 201){
                    alert("Đăng ký thành công");
                    props.navigation.navigate('Login')
                }else{
                    alert("Đăng ký không thành công");
                }
                    
            })
            .catch((ex) => {
                console.log(ex);
            });
    }

    React.useEffect (() =>{
        getData();
      }, [])

        return (
            <View style={styles.container}>
                <ScrollView>
                <Text style={{fontSize: 48, lineHeight: 72, marginTop: 30, color:'#1877F2'}}>Hello!</Text>
                <Text style={{fontSize: 20,width:200, lineHeight: 30, color:"#4E4B66"}}>Signup to get Started</Text>
        
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 40, fontSize:14}}>
                    <Text >Full name</Text>
                    <Text style={{color:"red", marginLeft: 5}}>*</Text>
                </View>
                <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}} onChangeText={(txt)=>{setfullname(txt)}}></TextInput>
        
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 16, fontSize:14}}>
                    <Text >Email</Text>
                    <Text style={{color:"red", marginLeft: 5}}>*</Text>
                </View>
                <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}} onChangeText={(txt)=>{setemail(txt)}}></TextInput>
                
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 16, fontSize:14}}>
                    <Text >Password</Text>
                    <Text style={{color:"red", marginLeft: 5}}>*</Text>
                </View>
                <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}} onChangeText={(txt)=>{setpassword(txt)}} extContentType="password" secureTextEntry={true}></TextInput>

                <View style={{display: 'flex', flexDirection: 'row', marginTop: 16, fontSize:14}}>
                    <Text >Address</Text>
                    <Text style={{color:"red", marginLeft: 5}}>*</Text>
                </View>
                <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}} onChangeText={(txt)=>{setaddress(txt)}}></TextInput>

                <View style={{display: 'flex', flexDirection: 'row', marginTop: 16, fontSize:14}}>
                    <Text >Phone Number</Text>
                    <Text style={{color:"red", marginLeft: 5}}>*</Text>
                </View>
                <TextInput style={{marginTop:10, padding:10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6, marginBottom: 48}} onChangeText={(txt)=>{setphone(txt)}}></TextInput>
        
        
                <Button title='Creat Account' onPress={doSignup}></Button>

                <View style={{display: 'flex', flexDirection: 'row', marginTop: 25, fontSize:14, alignSelf:"center"}}>
                    <Text >Already have an account ? </Text>
                    <Text style={{color:"#1877F2", marginLeft: 5, marginBottom: 40}} onPress={()=>{props.navigation.navigate('Login')}}>Login</Text>
                </View>
                </ScrollView>
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
