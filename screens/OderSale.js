import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import { RefreshControl, FlatList, Modal, Button, SafeAreaView, StyleSheet, Text, View, Image, Share, TouchableHighlight, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import filter from 'lodash.filter';

const OderSale = ({route, navigation }) => {

    const {status} = route.params;
    const [bill, setbill] = useState([]);
    const [detailed_bill, setdetailed_bill] = useState([]);

    const [showModalDialog, setshowModalDialog] = useState (false);

    const [id, setid] = useState("");
    const [idBill, setidBill] = useState("");
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");
    const [date, setdate] = useState("");
    const [total_price, settotal_price] = useState("");
    const [payment_methods, setpayment_methods] = useState("");
    const [note, setnote] = useState("");
    const [statusBill, setstatusBill] = useState("");

    const renderItem = ({item}) => {
        const toggleModal = () => {
            setshowModalDialog(!showModalDialog);
        };
    
        const HienModalBill = () =>{
            setid(item._id);
            setidBill(item.idBill);
            setname(item.name);
            setemail(item.email);
            setphone(item.phone);
            setaddress(item.address);
            setdate(item.date);
            settotal_price(item.total_price);
            setpayment_methods(item.payment_methods);
            setnote(item.note);
            setstatusBill(item.statusBill);

            toggleModal();
        };

        const UpdateBill = () =>{
            let statusNew = item.status;
    
            if (statusNew == "Chờ xác nhận") {
                statusNew = "Chờ lấy hàng"
            } else if (statusNew == "Chờ lấy hàng") {
                statusNew = "Đang giao"
            } else if (statusNew == "Đang giao") {
                statusNew = "Đã hoàn thành"
            }
    
            let obj = { _id: item._id, idBill: item.idBill, name: item.name, email: item.email, phone: item.phone, address: item.address,
                date: item.date, total_price: item.total_price, payment_methods: item.payment_methods, note: item.note, id_user: item.id_user, status: statusNew};
        
                let url_bill ="http://192.168.11.72:3000/api/bill/update/"+ item._id;
        
                fetch(url_bill, {
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify(obj)
            })
                .then((res) => {
                    if (res.status = 201){
                        alert("Thay đổi trạng thái đơn hàng thành công");
                        navigation.navigate('OderStatusSale')
                    }
                        
                })
                .catch((ex) => {
                    console.log(ex);
                });
        }

        return (
            <View>

            <View>
                <Modal visible={showModalDialog}>
                    <ScrollView style={{marginTop:30}}>
                        <View style={st.modal_dialog_view}>
                            
                            <Text style={styles.title}>Detailed Invoice</Text>
                            <View style={styles.invoiceDetail}>
                                <Text style={styles.label}>ID:</Text>
                                <Text style={styles.value}>{idBill}</Text>
                            </View>
                            <View style={styles.invoiceDetail}>
                                <Text style={styles.label}>Client:</Text>
                                <Text style={styles.value}>{name}</Text>
                            </View>
                            <View style={styles.invoiceDetail}>
                                <Text style={styles.label}>Email address:</Text>
                                <Text style={styles.value}>{email}</Text>
                            </View>
                            <View style={styles.invoiceDetail}>
                                <Text style={styles.label}>Phone:</Text>
                                <Text style={styles.value}>{phone}</Text>
                            </View>
                            <View style={styles.invoiceDetail}>
                                <Text style={styles.label}>Address:</Text>
                                <Text style={styles.value}>{address}</Text>
                            </View>
                            <View style={styles.invoiceDetail}>
                                <Text style={styles.label}>Date:</Text>
                                <Text style={styles.value}>{date}</Text>
                            </View>
                            <Text style={styles.productsTitle}>Products:</Text>

                            <SafeAreaView style={{marginTop:10}}>
                                <ScrollView>
                                    {detailed_bill.map((item, index) => {
                                        if (item.id_bill == idBill) {
                                            return(
                                                <View key={index}>
                                                    <View style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}>
                                                    <View style={{ width: 300}}>
                                                        <Text numberOfLines={2} >{item.name.toUpperCase()}</Text>
                                                        <Text numberOfLines={1} style={{color: "#FF6633", marginVertical:5}} >{item.price} đ</Text>
                                                    </View>
        
                                                    <Text style={{marginLeft:"auto"}}>{item.quantity}</Text>
                                                </View>
                                                <View style={styles.separator}/>
                                                </View>
                                            )
                                        }
                                
                                        })
                                    }
                        
                                </ScrollView>  

                            </SafeAreaView>
                            
                            <View style={styles.invoiceDetail}>
                                <Text style={styles.label}>Total Price:</Text>
                                <Text style={{ fontSize: 18, color: '', marginLeft: "auto", color:"#FF6633"}}>{total_price} đ</Text>
                            </View>

                            <View style={{height:30}}/>

                            <View style={styles.invoiceDetail}>
                                <Text style={styles.label}>Payment Methods:</Text>
                                <Text style={styles.value}>{payment_methods}</Text>
                            </View>

                            <View style={styles.invoiceDetail}>
                                <Text style={styles.label}>Node:</Text>
                                <Text style={styles.value}>{note}</Text>
                            </View>

                        </View> 
                    </ScrollView>

                    <View style={{height:20}}></View>
                    <Button title="Cancel" onPress={ toggleModal}/>
                    <View style={{height:20}}></View>
                </Modal>
            </View>

            <TouchableOpacity style={{marginHorizontal:20, flexDirection: 'row'}} onPress={HienModalBill}>
                <View style={{width:230}}>
                    <Text style={{ fontSize:16}} >Date: {item.date}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize:16}}>Total Price: </Text>
                        <Text style={{color:"#FF6633", fontSize:16}}>{item.total_price} đ</Text>
                    </View>
                </View>
                 <TouchableOpacity onPress={UpdateBill} style={{paddingHorizontal:10, paddingVertical:8, marginLeft:"auto", borderColor: "#000", borderRadius:10, borderWidth:1}}>
                    <Text>Done</Text>
                 </TouchableOpacity>
                
            </TouchableOpacity>
            <View style={styles.separator}/>
        </View>
        );
      };


    const getData = () =>{
        let url_bill = 'http://192.168.11.72:3000/api/bill';
      
         fetch(url_bill)
               .then((res) => {
                   return res.json();
               })
               .then( (data) =>{

                const bills = [];
                console.log(data);

                data.forEach(i => {
                    if(i.status.toLowerCase() == status.toLowerCase()){
                        
                        bills.push(i)
                    }
                });
                setbill(bills)
                
                 
               })
      }

      const getDataDetailed_bill = () =>{
        let url_bill = 'http://192.168.11.72:3000/api/detailed_bill';
      
         fetch(url_bill)
               .then((res) => {
                   return res.json();
               })
               .then( (data) =>{
                    setdetailed_bill(data)
               })
      }


      React.useEffect (() =>{
        getData(), getDataDetailed_bill();
      }, [])

    return (
        <View style={styles.container}>


            <View style={styles.herder}>
                    <TouchableOpacity style={{marginRight: "auto"}}  onPress={()=>{navigation.goBack()}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3114/3114883.png"}}/>
                    </TouchableOpacity>

                    <Text style={{fontSize:20, marginRight:"auto"}}>{status}</Text>
                    
                </View>
                <View style={styles.separator1}/>


                <View style={styles.contentContainer}> 
                    <View style={{marginHorizontal: 20}}>
                        <SafeAreaView style={{marginTop:40,}}>
                            <FlatList
                                data={bill.sort((a, b) => b.idBill - a.idBill)}
                                keyExtractor={item => item._id}
                                renderItem={renderItem}
                            />        
                        </SafeAreaView>

                    </View>

                </View>
                    
                            

                <View style={styles.separator1}/>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('HomeSale')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1946/1946488.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 80}} onPress={()=>{props.navigation.navigate('OderStatusSale')}}>
                        <Image style={{width:27, height:27}} source={{uri:"https://cdn-icons-png.flaticon.com/128/665/665916.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 80}} onPress={()=>{props.navigation.navigate('ProfileSale')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1144/1144760.png"}}/>
                    </TouchableOpacity>    
                    
                </View>
        </View>
    );
}

export default OderSale

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
        marginBottom: 24,
        color: '#333',
        textAlign: 'center',
        marginTop:20,
      },
      invoiceDetail: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
      },
      label: {
        fontWeight: 'bold',
        marginRight: 8,
        color: '#666',
      },
      value: {
        flex: 1,
        fontSize: 18,
        color: '#333',
      },
      productsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 24,
        color: '#333',
      },
      productItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      productName: {
        flex: 1,
        fontSize: 16,
        color: '#333',
      },
      productPrice: {
        fontSize: 16,
        color: '#333',
      },
});

const st = StyleSheet.create({
    modal_dialog_view:{
        flex:1,
        marginHorizontal:20,
    }
  })
