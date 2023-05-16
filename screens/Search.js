import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import { RefreshControl, Modal, Button, StyleSheet, Text, View, Image, Share, TouchableHighlight, Alert, TouchableOpacity, TextInput, ScrollView,SafeAreaView, FlatList } from 'react-native';

const CAT= [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      image: 'https://bizweb.dktcdn.net/100/414/728/products/5-1.jpg?v=1670559516383',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      image: 'https://bizweb.dktcdn.net/100/414/728/products/5-1.jpg?v=1670559516383',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      image: 'https://bizweb.dktcdn.net/100/414/728/products/5-1.jpg?v=1670559516383',
      title: 'Third Item',
    },
    
    
  ];

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
        <Image style={{width:160, height:80}} source={{uri: item.image}}></Image>
        <View style={styles.title}>
            <Text numberOfLines={1} style={{fontSize:13}} >{item.title}</Text>
        </View>
        
    </TouchableOpacity>
  );


const Search = (props) => {

    const [selectedId, setSelectedId] = useState();

    const renderItem = ({item}) => {

        return (
          <Item
            item={item}
            onPress={() => setSelectedId(item.id)}
          />
        );
      };

    return (
        <View style={styles.container}>
            <View style={styles.herder}>
                    <Text style={{fontSize:20, marginLeft: 175}}>Search</Text>
                    <TouchableOpacity style={{marginLeft: 125}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2832/2832495.png"}}/>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.separator1}/>


                <View style={styles.contentContainer}> 
                    <ScrollView >
                        <View style={{marginHorizontal: 20}}>
                            <TextInput placeholder="Search" style={{ padding:10, paddingLeft: 10, height:48, borderColor: "#4E4B66", borderWidth: 1, borderRadius: 6}}></TextInput>
                        
                            <Text style={{marginTop:20, fontSize:20}}>Categories</Text>
                            <SafeAreaView style={{marginTop:10, alignItems: "center",}}>
                                <FlatList
                                    numColumns={2}
                                    data={CAT}
                                    keyExtractor={item => item.id}
                                    extraData={selectedId}
                                    renderItem={renderItem}
                                />        
                            </SafeAreaView>

                            <View style={{height:30}}></View>
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
        width: 160,
        height: 120,
        backgroundColor: "#ffff",
        marginHorizontal: 12,
        marginVertical: 12,
        alignItems: "center",
      },
      title: {
        marginHorizontal: 5,
        marginVertical: 10,
        alignItems: "center"
      },

    container: {
        flex: 1,
        marginTop:20,
    },
    herder: {
        height: 70,
        display: 'flex', 
        flexDirection: 'row',
        alignItems: "center"
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