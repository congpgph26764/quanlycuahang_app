import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import { RefreshControl, FlatList, Modal, Button, SafeAreaView, StyleSheet, Text, View, Image, Share, TouchableHighlight, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import filter from 'lodash.filter';

const History = ({route, navigation }) => {

    const ip = "192.168.100.9";

    const {idU} = route.params;
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

    const [numOders, setnumOders] = useState("");
    const [totalAmo, settotalAmo] = useState("");


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

            <TouchableOpacity style={{marginHorizontal:20}} onPress={HienModalBill}>
                <Text style={{ fontSize:16}} >Date: {item.date}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize:16}}>Total Price: </Text>
                    <Text style={{color:"#FF6633", fontSize:16}}>{item.total_price} đ</Text>
                </View>
                
            </TouchableOpacity>
            <View style={styles.separator}/>
        </View>
        );
      };

    const getData = () =>{
        let url_bill = 'http://'+ip+':3000/api/bill';
      
         fetch(url_bill)
               .then((res) => {
                   return res.json();
               })
               .then( (data) =>{

                const bills = [];
                console.log(data);
                console.log(idU);
                let count = 0;
                let total = 0;

                data.forEach(i => {
                    if( (i.id_user == idU) &&
                        (i.status == "Đã hoàn thành")){
                        count += 1;
                        total += i.total_price;
                        bills.push(i)
                        
                    }
                });
                console.log(bills);
                setbill(bills);
                setnumOders(count);
                settotalAmo(total)
                
                 
               })
      }

      const getDataDetailed_bill = () =>{
        let url_bill = 'http://'+ip+':3000/api/detailed_bill';
      
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

                    <Text style={{fontSize:20, marginRight:"auto"}}>Purchase List</Text>
                    
                </View>
                <View style={styles.separator1}/>


                <View style={styles.contentContainer}> 

                    <View style={{marginHorizontal: 20}}>
                        <Text style={{marginTop:20, fontSize:20, marginBottom: 5}}>Statistical</Text>
                        <View style={styles.separator1}/>
                        <View style={{display: "flex", flexDirection: 'row', marginVertical: 10}}>
                            <View style={{width:"50%", alignItems: "center"}}>
                                <Text>Number of Orders</Text>
                                <Text style={{color:"blue", fontSize:20, fontWeight: 'bold'}}>{numOders}</Text>
                            </View>
                            
                            <View style={{width:"50%", alignItems: "center", borderStartWidth: 1,}}>
                                <Text>The Total Amount</Text>
                                <Text style={{color:"#FF6633", fontSize:20, fontWeight: 'bold'}}>{totalAmo} đ</Text>
                            </View>
                        </View>
                        <View style={styles.separator1}/>
                    </View>
                    

                    <View style={{marginHorizontal: 20,marginVertical: 20}}>
                        <Text style={{fontSize:20}}>Purchase List</Text>
                        <SafeAreaView style={{marginTop:10,}}>
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

export default History

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
