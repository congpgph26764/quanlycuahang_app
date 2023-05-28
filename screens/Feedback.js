import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import { RefreshControl, Modal, Button, StyleSheet, Text, View, Image, Share, TouchableHighlight, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const Feedback = (props) => {

    const [fullname, setfullname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [comment, setcomment] = useState("");

    const [img_source, setimg_source] = useState(null)
    const [img_base64, setiimg_base64] = useState("")

    const pickImage = async () => {
         
    // Đọc ảnh từ thư viện thì không cần khai báo quyền
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3], // khung view cắt ảnh 
        quality: 1,
    });


    console.log(result);


    if (!result.canceled) {
        setimg_source(result.assets[0].uri);
        // chuyển ảnh thành base64 để upload lên json
        let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
        let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file


        FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
            .then((res) => {
    // phải nối chuỗi với tiền tố data image
                setiimg_base64("data:image/" + file_ext + ";base64," + res); 
                console.log(img_base64);
    // upload ảnh lên api thì dùng PUT có thể viết ở đây
            });
        }
    }


    const Feedback = () =>{


        if (fullname.length == 0) {

            alert("Chưa nhập fullname")
            return;
        }
        if (phone.length == 0) {

            alert("Chưa nhập phone number")
            return;
        }
        if (email.length == 0) {

            alert("Chưa nhập email")
            return;
        }
        if (comment.length == 0) {

            alert("Chưa nhập comment")
            return;
        }




        let obj = { fullname: fullname, email: email, phone: phone, comment: comment, image: img_base64 };

        let url_feed = 'http://192.168.100.9:3000/api/feedback/add';
        
        fetch(url_feed, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(obj)
        })
            .then((res) => {
                if (res.status = 201){
                    alert("Gửi Feedback thành công");
                    console.log(obj);
                    props.navigation.navigate('Home')
                }
                    
            })
            .catch((ex) => {
                console.log(ex);
            });
    }


    return (
        <View style={styles.container}>
            <View style={styles.herder}>
                    <Text style={{fontSize:20}}>Feedback</Text>
                    
                </View>
                <View style={styles.separator1}/>


                    <View style={styles.contentContainer}> 
                        <ScrollView style={{paddingHorizontal:20}}>

                            <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, fontSize:14}}>
                                <Text >Full name</Text>
                                <Text style={{color:"red", marginLeft: 5}}>*</Text>
                            </View>
                            <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}} onChangeText={(txt)=>{setfullname(txt)}}></TextInput>

                            <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, fontSize:14}}>
                                <Text >Phone Number</Text>
                                <Text style={{color:"red", marginLeft: 5}}>*</Text>
                            </View>
                            <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}} onChangeText={(txt)=>{setphone(txt)}}></TextInput>

                            <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, fontSize:14}}>
                                <Text >Email</Text>
                                <Text style={{color:"red", marginLeft: 5}}>*</Text>
                            </View>
                            <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}} onChangeText={(txt)=>{setemail(txt)}}></TextInput>

                            <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, fontSize:14}}>
                                <Text >Comment</Text>
                                <Text style={{color:"red", marginLeft: 5}}>*</Text>
                            </View>
                            <TextInput style={{marginTop:10, padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}} onChangeText={(txt)=>{setcomment(txt)}}></TextInput>

                            <TouchableOpacity onPress={pickImage} style={{marginTop: 40, marginBottom: 60,borderStyle: "dashed",alignItems:"center", alignSelf: "center", width: 300, height: 250, borderColor: "#4E4B66", borderWidth: 1}}>
                                <Image style={{width:"100%", height: "100%" }} source={{uri: img_base64 }}/>
                                <Text style={{marginTop:10}}>Add Cover Photo</Text>
                            </TouchableOpacity>
                            

                            <Button title='Send Feedback' onPress={Feedback}></Button>

                            <View style={{height:50}}></View>

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
    },
    footer: {
        padding: 15,
        flexDirection: 'row',
        display: 'flex', 
        alignSelf: "center",
        alignItems: "center"
    }
});