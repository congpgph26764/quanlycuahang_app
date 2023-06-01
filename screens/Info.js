import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import { RefreshControl, Modal, Button, StyleSheet, Text, View, Image, Share, TouchableHighlight, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const User = ({navigation}) => {

    const [objU, setobjU] = useState({});

    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [phone, setphone] = useState("");

    const [showModalDialog, setshowModalDialog] = useState (false);

    const toggleModal = () => {
        setshowModalDialog(!showModalDialog);
    };

    const HienModalUpdate = () =>{
        toggleModal();
    };
    

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
                                    
            let obj = { _id: objU._id, name: name, role: objU.role, email: objU.email, phone: phone, password: objU.password, address: address};
    
            let url_user ="http://192.168.100.9:3000/api/users/update/"+objU._id;
    
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
                    alert("Update thành công, Logout để cập nhập thông tin");
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
                    <TouchableOpacity  onPress={()=>{navigation.goBack()}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3114/3114883.png"}}/>
                    </TouchableOpacity>

                    <Text style={{fontSize:20, marginLeft:140}}>Info</Text>
                    
                    <TouchableOpacity style={{marginLeft: 140}} onPress={HienModalUpdate}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/1827/1827933.png"}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.separator1}/>


                <View style={styles.contentContainer}> 
                    <ScrollView >
                        <View style={{marginTop: 30, flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                    
                        <Image
                            source={{ uri: 'https://bizweb.dktcdn.net/100/414/728/products/5-1.jpg?v=1670559516383' }}
                            style={styles.profileImage}
                        />
                        <Text style={styles.name}>{objU.name}</Text>
                        <Text style={styles.bio}>Email: {objU.email}</Text>
                        <Text style={styles.location}>Phone: {objU.phone}</Text>
                        <Text style={styles.location}>Address: {objU.address}</Text>

                            

                            <View style={{height:30}}></View>

                        </View>

                        <View>
                            <Modal visible={showModalDialog}>
                                <View style={st.modal_dialog_view}>

                                    <View style={{alignItems:"center", paddingTop: 20}}>
                                        <Text style= {{fontSize: 25, marginTop:10}}>Update</Text>
                                    </View>

                                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 40, fontSize:14}}>
                                    <Text >Full Name</Text>
                                    </View>
                                    <TextInput onChangeText={(txt)=>{setname(txt)}} placeholder='Full Name' style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>
                                    
                                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 16, fontSize:14}}>
                                        <Text >Phone Number</Text>
                                    </View>
                                    <TextInput onChangeText={(txt)=>{setphone(txt)}} placeholder='Phone Number' style={{marginTop:10, padding:10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>
                            
                                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 16, fontSize:14}}>
                                        <Text >Address</Text>
                                    </View>
                                    <TextInput onChangeText={(txt)=>{setaddress(txt)}} placeholder='Address' style={{marginTop:10, padding:10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6, marginBottom: 50}}></TextInput>


                                    <View style={{height:20}}></View>
                                    <Button title="Save" onPress={Update}/>
                                    <View style={{height:20}}></View>
                                    <Button title="Cancel" onPress={ toggleModal}/>
                                </View> 
                            </Modal>
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