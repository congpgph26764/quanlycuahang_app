import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import { RefreshControl, Modal, Button, StyleSheet, Text, View, Image, Share, TouchableHighlight, Alert, TouchableOpacity, TextInput, ScrollView,SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import filter from 'lodash.filter';

const Search = (props) => {

    const ip = "192.168.100.9";

    const [selectedId, setSelectedId] = useState();
    const [cat, setcat] = useState([])
    const [pro, setpro] = useState([])
    const [fullData, setFullData] = useState([])

    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const  handleSearchCat = (query) =>{
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (pro) =>{
            return containsCat(pro, formattedQuery);
        })
        setpro(filteredData)
    }

    const containsCat = ({id_category}, query) =>{
        if (id_category.includes(query) ) {    
            return true;
        }
        return false;
    }


    const handleSearch = (query) =>{
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (pro) =>{
            return contains(pro,formattedQuery);
        })
        setpro(filteredData)
    };

    const contains = ({name}, query) =>{
        if (name.includes(query) ) {    
            return true;
        }
        return false;
    }

    const Item = ({item, onPress, backgroundColor, textColor}) => (

        <TouchableOpacity onPress={onPress} style={[styles.item,{backgroundColor}]} >
            <Text style={[{fontSize:13}, {color: textColor}]} >{item.name}</Text>
            
        </TouchableOpacity>
      );

      const ItemPro = ({item, onPress, backgroundColor, textColor}) => (
        <TouchableOpacity style={styles.itempro1} onPress={()=>{props.navigation.navigate('Detail', {
            id: item._id,
            name: item.name,
            description: item.description,
            id_category: item.id_category,
            price: item.price,
            image: item.image,
            image1: item.image1,
            image2: item.image2,
            quantity: item.quantity,
            status: item.status
            })}} >
            <Image style={{width:170, height:180}} source={{uri: item.image}}></Image>
            <View style={styles.titlepro}>
                <Text numberOfLines={2} style={{fontSize:13}} >
                    {item.name.toUpperCase()}</Text>
                <Text style={{fontSize:12, marginTop:5}}> {item.price} đ</Text>
            </View>
            
        </TouchableOpacity>
      );

      const renderItemPro = ({item}) => {
        
        return (
          <ItemPro
            item={item}
          />
        );
      };

    const renderItem = ({item}) => {
        
        const backgroundColor = item._id === selectedId ? '#FFFF33' : '#ffff';
        return (
        <Item
            item={item}
            onPress={() => {
                if (item.name=="All") {
                    setSelectedId(item._id)
                    handleSearchCat("")
                  }else{
                    setSelectedId(item._id),
                    handleSearchCat(item._id)
                  }
            }}
            backgroundColor={backgroundColor}
        />
        );
      };

      const getDataPro = () =>{
        let url_pro = 'http://'+ip+':3000/api/products';
      
         fetch(url_pro)
               .then((res) => {
                   return res.json();
               })
               .then( (data) =>{
                setpro(data);
                setFullData(data);
                setIsLoading(false)
               })
      }

      const getDataCat = () =>{
        let url_cat = 'http://'+ip+':3000/api/categories';
      
         fetch(url_cat)
               .then((res) => {
                   return res.json();
               })
               .then( (data) =>{
                setcat(data);
                setIsLoading(false)
               })
      }

      React.useEffect (() =>{
        setIsLoading(true);
        getDataPro(),getDataCat()
      }, [])

      if (isLoading) {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'} color="#5500dc"/>
            </View>
            
        )
      }

    return (
        <View style={styles.container}>
            <View style={styles.herder}>
                
                    <Text style={{fontSize:20, marginLeft: "auto", }}>Search</Text>
                    <TouchableOpacity style={{marginLeft:"auto"}}  onPress={()=>{props.navigation.navigate('Cart')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2832/2832495.png"}}/>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.separator1}/>


                <View style={styles.contentContainer}> 
                    <ScrollView >
                        <View style={{marginHorizontal: 20}}>
                            <SafeAreaView style={{ flex:1}}>
                                <TextInput placeholder="Search" 
                                clearButtonMode='always'
                                style={{ padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}
                                autoCapitalize='none'
                                autoCorrect={false}
                                value={searchQuery}
                                onChangeText={(query)=> handleSearch(query)}></TextInput>
                            </SafeAreaView>
                            
                            <Text style={{marginTop:20, fontSize:20}}>Categories</Text>
                            <SafeAreaView style={{marginTop:10, alignItems: "center"}}>
                                <FlatList
                                    style={{width: "100%"}}
                                    horizontal
                                    data={cat}
                                    keyExtractor={item => item._id}
                                    extraData={selectedId}
                                    renderItem={renderItem}/>        
                            </SafeAreaView>

                            <Text style={{marginTop:20, fontSize:20}}>Products</Text>
                            <SafeAreaView style={{marginTop:10, alignItems: "center"}}>
                                <FlatList
                                    
                                    data={pro}
                                    keyExtractor={item => item._id}
                                    numColumns={2}
                                    extraData={selectedId}
                                    renderItem={renderItemPro}
                                    
                                />        
                            </SafeAreaView>

                        </View>
                        
                        
                    </ScrollView>
                    
                </View>
                    
                            

                <View style={styles.separator1}/>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Home')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1946/1946488.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 70}} onPress={()=>{props.navigation.navigate('Search')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3126/3126546.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 70}} onPress={()=>{props.navigation.navigate('Feedback')}}>
                        <Image style={{width:27, height:27}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2567/2567557.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 70}} onPress={()=>{props.navigation.navigate('User')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1144/1144760.png"}}/>
                    </TouchableOpacity>       
                    
                </View>
        </View>
    );
}

export default Search

const styles = StyleSheet.create({

    item: {
        backgroundColor: "#ffff",
        paddingHorizontal: 10,
        paddingVertical:5,
        marginHorizontal:10,
        marginBottom:10,
        borderRadius:10,
        borderColor: "#4E4B66", 
        borderWidth: 1,
        alignItems: "center",
      },
      title: {
        marginHorizontal: 5,
        marginVertical: 10,
        alignItems: "center"
      },

      itempro1: {
        width: 170,
        height: 260,
        backgroundColor: "#ffff",
        marginHorizontal: 10,
        marginVertical: 10,
      },
      titlepro: {
        marginHorizontal: 10,
        marginVertical: 10,
        alignItems: "center"
      },

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
    }
});