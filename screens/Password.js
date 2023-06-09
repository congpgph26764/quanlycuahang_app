import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import { RefreshControl, Modal, Button, StyleSheet, Text, View, Image, Share, TouchableHighlight, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Password = ({navigation}) => {

    const ip = "192.168.100.9";

    const [cuPass, setCuPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [rePass, setRePass] = useState("");

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


    const Update = () =>{

        if (cuPass.length ==0 ) {
            alert("Chưa nhập Current Password")
            return;
        }
        if (newPass.length ==0 ) {
            alert("Chưa nhập New Password")
            return;
        }
        if (rePass.length ==0 ) {
            alert("Chưa nhập Re-Password")
            return;
        }
        if (cuPass != objU.password ) {
            alert("Mật khẩu cũ không đúng")
            return;
        }
        if (rePass != newPass ) {
            alert("Mật khẩu nhập lại không đúng")
            return;
        }
                                    
        let obj = { _id: objU._id, name: objU.name, role: objU.role, email: objU.email, phone: objU.phone, password: newPass, address: objU.address};

        let url_user ='http://'+ip+':3000/api/users/update/'+objU._id;

        fetch(url_user, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(obj)
    })
        .then((res) => {
            if (res.status = 201){
                alert("Thanh đổi mật khẩu thành công!\nLogout để cập nhập thông tin");
                navigation.navigate('User')
            }
                
        })
        .catch((ex) => {
            console.log(ex);
        });

    }

    return (
        <View style={styles.container}>
            <View style={styles.herder}>
                    <TouchableOpacity style={{marginRight:"auto"}}  onPress={()=>{navigation.goBack()}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3114/3114883.png"}}/>
                    </TouchableOpacity>

                    <Text style={{fontSize:20, marginRight:"auto"}}>Password</Text>
                    
                </View>
                <View style={styles.separator1}/>


                <View style={styles.contentContainer}> 
                    <ScrollView >
                        <View style={{marginHorizontal:20}}>
                            <View style={{display: 'flex', flexDirection: 'row', marginTop: 40, fontSize:14}}>
                            <Text >Current Password</Text>
                            </View>
                            <TextInput onChangeText={(txt)=>{setCuPass(txt)}} placeholder='Current Password'  extContentType="password" secureTextEntry={true} style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>
                            
                            <View style={{display: 'flex', flexDirection: 'row', marginTop: 40, fontSize:14}}>
                                <Text >New Password</Text>
                            </View>
                            <TextInput onChangeText={(txt)=>{setNewPass(txt)}} placeholder='New Password'  extContentType="password" secureTextEntry={true} style={{marginTop:10, padding:10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>
                    
                            <View style={{display: 'flex', flexDirection: 'row', marginTop: 16, fontSize:14}}>
                                <Text >Re-Password</Text>
                            </View>
                            <TextInput onChangeText={(txt)=>{setRePass(txt)}} placeholder='Re-Password' extContentType="password" secureTextEntry={true} style={{marginTop:10, padding:10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6, marginBottom: 50}}></TextInput>

                            <Button title='Save' onPress={Update}></Button>
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

export default Password

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

const st = StyleSheet.create({
    modal_dialog_view:{
        flex:1,
        marginLeft:20,
        marginRight:20
    }
  })