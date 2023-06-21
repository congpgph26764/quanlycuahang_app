import { StatusBar } from 'expo-status-bar';
import React, {Component, useState,useRef, useEffect} from "react";
import { RefreshControl, Modal, Button, StyleSheet, Text, View, Image, Share, SafeAreaView,ActivityIndicator, TouchableHighlight, Alert, TouchableOpacity, TextInput, Dimensions, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking} from 'react-native';
import filter from 'lodash.filter';

const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "",
      subtitle:
        "",
      image:
        "https://i.pinimg.com/564x/6d/40/5b/6d405ba70fb0c13cd0f200bea6caf4e3.jpg",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "SS/23",
      subtitle:
        "Founnded in 2011, ABC aims to become the best Hip Hop inspired fashion brand in Vietnam. Each of our products is created by a youthful enthusiastic team.",
      image:
        "https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/slider_1.jpg?1684825446459",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Fall 23",
      subtitle:
        "One of the great works prepared for this fall.",
      image:
        "https://balenciaga.dam.kering.com/m/22c22a53629a8f04/Large-HOME_0000_FA23_LOOK_57_EWAN.jpg",
    },
  ];
  
  // Default Props
  const defaults = {
    height: 200,
    width: Dimensions.get("window").width,
    delay: 5000,
  };
  
  // Default Image Item
  const Itema = ({ title, image, height, width, onPress, subtitle }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.imageContainer, { height: height, width: width }]}
    >
      <Image source={{ uri: image }} style={[styles.image, { height: height }]} />
      <View style={styles.titleContainer}>
        {title && <Text style={styles.title}>{title} </Text>}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );

    // Default On Press Action
    const handlePress = (item) => {
      console.log("Pressed", item.id);
    };
  


const Home = (
    props,
    {data = DATA,
    height = defaults.height,
    width = defaults.width,
    delay = defaults.delay,
    onPress = handlePress,
    ItemElement = Itema,}
    ) => {

      const ip = "192.168.100.9";

    const [selectedId, setSelectedId] = useState();
  const [selectedIndex, setselectedIndex] = useState(0);
  const scrollView = useRef();
  const [pro, setpro] = useState([])
  const [cat, setcat] = useState([])
  const [fullData, setFullData] = useState([])
  const [proNew, setProNew] = useState([])
  const [fullDataNew, setFullDataNew] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const  handleSearchCat = (query) =>{
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (pro) =>{
        return containsCat(pro, formattedQuery);
    })
    setpro(filteredData)

    const filteredDataNew = filter(fullDataNew, (pro) =>{
      return containsCat(pro, formattedQuery);
  })
    setProNew(filteredDataNew)
}

const containsCat = ({id_category}, query) =>{
    if (id_category.includes(query) ) {    
        return true;
    }

    if (query.includes("6472a7d21966a8c0795191e5") ) {    
      return false;
  }
    return false;
}


  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={styles.itemcat1}>
        <View style={[styles.itemcat, {backgroundColor}]}>
            <Image style={{width:25, height:25}} source={{uri: item.image}}></Image>
        </View>
      <Text style={[styles.titlecat, {color: textColor}]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const ItemNew = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity style={styles.itemnew1} onPress={()=>{props.navigation.navigate('Detail', {
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
      })}}>
        <Image style={{width:160, height:150}} source={{uri: item.image}} ></Image>
        <View style={styles.titlenew}>
            <Text numberOfLines={2} >
                {item.name.toUpperCase()}</Text>
            <Text numberOfLines={3} style={{marginTop:5, fontSize: 11}}>
              {item.description.length < 200
                ? `${item.description}`
                : `${item.description.substring(0, 200)}...`}
            </Text>
            <TouchableOpacity style={{alignSelf: "center",marginTop:15, backgroundColor: "#8B4513", padding:5}} onPress={()=>{props.navigation.navigate('Detail', {
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
                                })}}>
                <Text style={{color:"#fff"}}>Detail View</Text>
            </TouchableOpacity>
        </View>
      
    </TouchableOpacity>
  );

  const ItemPo = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity style={styles.itempo1} onPress={()=>{props.navigation.navigate('Detail', {
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
      })}}>
        <Image style={{width:120, height:150}} source={{uri: item.image}}></Image>
        <View style={styles.titlepo}>
            <Text numberOfLines={2} style={{fontSize:13}} >
                {item.name.toUpperCase()}</Text>
            <Text style={{fontSize:12, marginTop:5}}> {item.price} đ</Text>
        </View>
        
    </TouchableOpacity>
  );



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

  const renderItemNew = ({item}) => {
    if (item.status.toLowerCase() == "new") {

      return (
        <ItemNew
          item={item}
        />
      );
    }
  };

  const renderItemPo = ({item}) => {

    return (
      <ItemPo
        item={item}
        onPress={() => setSelectedId(item._id)}
      />
    );
  };

  // Script which will only executed when component initilizes
  React.useEffect(() => {
    const fn = setInterval(() => {
      setselectedIndex((oldCount) =>
        oldCount === data.length - 1 ? 0 : oldCount + 1
      );
    }, delay);
    return () => {
      clearInterval(fn);
    };
  }, []);

  // Script will executed every time selectedIndex updates
  React.useEffect(() => {
    scrollView.current.scrollTo({
      animated: true,
      x: width * selectedIndex,
      y: 0,
    });
  }, [selectedIndex]);

  const setIndex = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    setselectedIndex(Math.floor(contentOffset.x / viewSize.width));
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

            const products = [];

            data.forEach(pro => {
              if (pro.status.toLowerCase() == "new") {
                products.push(pro)
              }
            });
            setProNew(products)
            setFullDataNew(products);
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
                    <Text style={{fontSize:30, marginRight: 'auto'}}>PRADA</Text>
                    
                    <TouchableOpacity style={{ marginLeft: "auto"}}  onPress={()=>{props.navigation.navigate('Cart')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2832/2832495.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 30}} onPress={()=>{props.navigation.navigate('Notification')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2529/2529521.png"}}/>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.separator1}/>

                <View style={styles.contentContainer}> 

                    <ScrollView>
                        <ScrollView
                            ref={scrollView}
                            horizontal
                            pagingEnabled
                            onMomentumScrollEnd={setIndex}
                            onContentSizeChange={() => scrollView.current.scrollToEnd()}>
                            <View style={styles.carousalContainer}>
                            {data.map((item) => (
                                <ItemElement
                                key={item.id}
                                height={height}
                                width={width}
                                {...item}
                                onPress={() => onPress(item)}
                                />
                            ))}
                            </View>
                        </ScrollView>

                        <View style={{marginHorizontal:20, marginTop: 10}}>

                        <Text style={{marginTop:20,fontSize:20}}>Categories</Text>
                            <SafeAreaView>
                                <FlatList
                                    horizontal
                                    data={cat}
                                    keyExtractor={item => item._id}
                                    extraData={selectedId}
                                    renderItem={renderItem}
                                />        
                            </SafeAreaView>
                            <Text style={{marginTop:10, fontSize:20}}>New In</Text>

                            <SafeAreaView style={{marginTop:10}}>
                                <FlatList
                                    horizontal
                                    data={proNew}
                                    keyExtractor={item => item._id}
                                    extraData={selectedId}
                                    renderItem={renderItemNew}
                                />        
                            </SafeAreaView>

                            <Text style={{marginTop:20,fontSize:20}}>Products</Text>

                            <SafeAreaView style={{marginTop:10}}>
                                <FlatList
                                    horizontal
                                    data={pro}
                                    keyExtractor={item => item._id}
                                    extraData={selectedId}
                                    renderItem={renderItemPo}
                                />        
                            </SafeAreaView>
                            <View style={{height:30}}></View>
                        </View>

                    </ScrollView>

                </View>
                            

                <View style={styles.separator1}/>
                <View style={styles.footer}>
                    <TouchableOpacity>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1946/1946436.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 70}} onPress={()=>{props.navigation.navigate('Search')}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/3126/3126554.png"}}/>
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

export default Home

const styles = StyleSheet.create({

    itemnew1: {
        width: 300,
        height: 150,
        backgroundColor: "#ffff",
        marginHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
      },
      titlenew: {
        width: 120,
        marginHorizontal: 10,
        height: 140,
        marginVertical: 10,
        
      },

      itempo1: {
        width: 120,
        height: 230,
        backgroundColor: "#ffff",
        marginHorizontal: 10,
      },
      titlepo: {
        marginHorizontal: 5,
        marginVertical: 10,
        alignItems: "center"
      },

    itemcat: {
        paddingTop: 10,
        width:50,
        height: 50,
        alignItems: "center",
        alignSelf: "center",
      },
      itemcat1: {
        width: 60,
        marginVertical: 8,
        marginHorizontal: 10,
        alignItems: "center",
      },
      titlecat: {
        marginTop: 5,
        fontSize: 15,
      },

    carousalContainer: {
        flexDirection: "row",
        width: "100%",
      },
      imageContainer: { backgroundColor: "yellow" },
      item: {
        backgroundColor: "rgba(91, 91, 91, 0.3)",
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
      },
      titleContainer: {
        position: "absolute",
        bottom: 10,
        width: "100%",
        paddingLeft: 10,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      },
      title: {
        fontSize: 28,
        color: '#fff',
        fontWeight: "bold",
      },
      subtitle: {
        color: '#fff',
      },
      image: {
        width: defaults.width,
        height: defaults.height,
      },


    container: {
        flex: 1,
        marginTop:20,
    },
    herder: {
        height: 70,
        display: 'flex', 
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

