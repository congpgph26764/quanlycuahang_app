import { StatusBar } from 'expo-status-bar';
import React, {Component} from "react";
import { Button, StyleSheet, Text, View, Modal, TextInput } from 'react-native';
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = (props) => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [manhinhcho, setmanhinhcho] = useState (false);

    const ManHinhCho = () => {
        setmanhinhcho(!manhinhcho);
      };
    
      const Dem = () =>{
        setTimeout(() => {
          ManHinhCho()
      }, 5000);
      }

      const doLogin =  () => {
        // kiểm tra hợp lệ dữ liệu
            if (email.length == 0) {
                // thông báo:
                alert("Chưa nhập email")
                return;
            }
            if (password.length == 0) {
                // thông báo:
                alert("Chưa nhập password")
                return;
            }
    
            // url_check_login
           let url_check_login = 'http://192.168.100.9:3000/api/users?keyword='+email;
    
    
           fetch(url_check_login)
               .then((res) => {
                   return res.json();
               })
               .then(  async (res_login) => {
                   if (res_login.length != 1) {
                       alert("Không tồn tại Email");
                       return;
                   } else {
                       // kiểm tra password
                       let objU = res_login[0];

                       if (objU.password == password) {
                           // đúng pass thì lưu vào storage
    
    
                           try {
                              await AsyncStorage.setItem("login", JSON.stringify(objU) );
                               props.navigation.navigate('Home');    
                             } catch (e) {
                               // saving error
                               console.log(e);
                             }
                          
                       }else{
                           alert("Sai password");
                       }
                   }
    
    
               })
    
        }

        React.useEffect (() =>{
            ManHinhCho();
          }, [])

    return (
        <View style={styles.container}>
            <Modal visible={manhinhcho}>
                <View style={st.modal_dialog_view}>
                <Dem/>
                <Text style={{fontSize:50, alignSelf:"center", marginTop:100}}>Hello!</Text>
                </View>
            </Modal>
            <Text style={{fontSize: 48, lineHeight: 72, marginTop: 70}}>Hello</Text>
            <Text style={{fontSize: 48, lineHeight: 60, color:'#1877F2'}}>Again!</Text>
            <Text style={{fontSize: 20,width:200, lineHeight: 30, color:"#4E4B66"}}>Welcome back you’ve been missed</Text>
    
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 40, fontSize:14}}>
                <Text >Email</Text>
                <Text style={{color:"red", marginLeft: 5}}>*</Text>
            </View>
            <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}} onChangeText={(txt)=>{setemail(txt)}}></TextInput>
    
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 16, fontSize:14}}>
                <Text >Password</Text>
                <Text style={{color:"red", marginLeft: 5}}>*</Text>
            </View>
            <TextInput style={{marginTop:10, padding:10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}} onChangeText={(txt)=>{setpassword(txt)}} extContentType="password"
               secureTextEntry={true}></TextInput>
    
            <View style={{height:50}}></View>
    
            <Button title='Login' onPress={doLogin}></Button>
            <View style={{height:20}}/>

            <View style={{display: 'flex', flexDirection: 'row', marginTop: 25, fontSize:14, alignSelf:"center"}}>
                <Text >don’t have an account ? </Text>
                <Text style={{color:"#1877F2", marginLeft: 5}} onPress={()=>{props.navigation.navigate('Signup')}}>Sign Up</Text>
            </View>
        </View>
        );
}

export default Login

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
    marginRight: 25,
  },
});
const st = StyleSheet.create({
    modal_dialog_view:{
        flex:1,
        marginLeft:20,
        marginRight:20
    }
  }) 
