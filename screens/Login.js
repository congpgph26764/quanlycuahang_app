import { StatusBar } from 'expo-status-bar';
import React, {Component} from "react";
import { Button, StyleSheet, Text, View, Modal, TextInput } from 'react-native';
import { useState } from "react";


const Login = (props) => {
    const [manhinhcho, setmanhinhcho] = useState (false);

    const ManHinhCho = () => {
        setmanhinhcho(!manhinhcho);
      };
    
      const Dem = () =>{
        setTimeout(() => {
          ManHinhCho()
      }, 5000);
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
                <Text >Username</Text>
                <Text style={{color:"red", marginLeft: 5}}>*</Text>
            </View>
            <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}} ></TextInput>
    
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 16, fontSize:14}}>
                <Text >Password</Text>
                <Text style={{color:"red", marginLeft: 5}}>*</Text>
            </View>
            <TextInput style={{marginTop:10, padding:10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}
               secureTextEntry={true}></TextInput>
    
            <Text style={{marginTop:10, textAlign: "right", color: "#1877F2", marginBottom: 23}} >Forgot the password ?</Text>
    
            <Button title='Login'></Button>
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
