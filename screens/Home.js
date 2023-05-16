import { StatusBar } from 'expo-status-bar';
import React, {Component, useState,useRef, useEffect} from "react";
import { RefreshControl, Modal, Button, StyleSheet, Text, View, Image, Share, SafeAreaView, TouchableHighlight, Alert, TouchableOpacity, TextInput, Dimensions, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking} from 'react-native';


const CATEGORY= [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      image: 'https://cdn-icons-png.flaticon.com/128/2529/2529521.png',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      image: 'https://cdn-icons-png.flaticon.com/128/2529/2529521.png',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      image: 'https://cdn-icons-png.flaticon.com/128/2529/2529521.png',
      title: 'Third Item',
    },
    
  ];

  const PRO= [
    {
      id: '6426a323e027b4ed69c318db',
      name: "SMILEY FACE HOODIE",
      image: 'https://bizweb.dktcdn.net/100/414/728/products/5-1.jpg?v=1670559516383',
      price: 500000,
      quantity: 100,
      description: "Chất liệu : Vải nỉ bông 300 GSM. Màu sắc : Đen, Ghi đậm, Xanh lá. Form dáng : Form Hoodie Regular. Cảm hứng thiết kế : Mặt trước in logo ClownZ cùng dòng chữ Smiley Face Brand, mặt sau in text ClownZ được thiết kế theo style gothic, đi kèm dòng chữ Stand for northside ở bên dưới. Công nghệ in ấn / thiết kế : in kéo lụa hiệu ứng nổi vân đá. Chi tiết đặc biệt : hình in có hiệu ứng nổi vân đặc biệt"
    },
    {
      id: '6426bfa339e9e48b3ebb3ea1',
      name: "CLOWNZ EMBOSSING T-SHIRT",
      image: 'https://bizweb.dktcdn.net/100/414/728/products/1-8bf1535a-a88c-4bc8-b61e-3c35764f0314.jpg?v=1679297202317',
      price: 400000,
      quantity: 50,
      description: "",
    },
    
  ];


const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "The most beutiful railway track!",
      subtitle:
        "This is a long subtitle. Which also can be used to display flashnews.",
      image:
        "https://i.picsum.photos/id/524/700/500.jpg?hmac=PuAKCqRNlpa6_UJLeKABjXH9l3MFgsv-LHMm0bDfey4",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Memories lives in this home",
      subtitle:
        "This is a long subtitle. Which also can be used to display flashnews.",
      image:
        "https://i.picsum.photos/id/193/700/500.jpg?hmac=q5QJ9ieureq_dXwwsUmh7ub2pN-V1arRrqpMV7czc9g",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Snow and Fun! How can we forget",
      subtitle:
        "This is a long subtitle. Which also can be used to display flashnews.",
      image:
        "https://i.picsum.photos/id/971/700/500.jpg?hmac=kNTldtPvd24NEOfvd39iwsRBun4As0dYChiWQuyCFo4",
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

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={styles.itemcat1}>
        <View style={[styles.itemcat, {backgroundColor}]}>
            <Image style={{width:25, height:25}} source={{uri: item.image}}></Image>
        </View>
      <Text style={[styles.titlecat, {color: textColor}]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const ItemNew = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={styles.itemnew1}>
        <Image style={{width:160, height:150}} source={{uri: item.image}}></Image>
        <View style={styles.titlenew}>
            <Text numberOfLines={2} >
                {item.name.length < 200
                ? `${item.name}`
                : `${item.name.substring(0, 200)}...`}</Text>
            <Text numberOfLines={3} style={{marginTop:5, fontSize: 11}}>
              {item.description.length < 200
                ? `${item.description}`
                : `${item.description.substring(0, 200)}...`}
            </Text>
            <TouchableOpacity style={{alignSelf: "center",marginTop:15, backgroundColor: "#8B4513", padding:5}}>
                <Text style={{color:"#fff"}}>Add Cart</Text>
            </TouchableOpacity>
        </View>
      
    </TouchableOpacity>
  );

  const ItemPo = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={styles.itempo1}>
        <Image style={{width:120, height:150}} source={{uri: item.image}}></Image>
        <View style={styles.titlepo}>
            <Text numberOfLines={2} style={{fontSize:13}} >
                {item.name.length < 200
                ? `${item.name}`
                : `${item.name.substring(0, 200)}...`}</Text>
            <Text style={{fontSize:12, marginTop:5}}> {item.price} đ</Text>
        </View>
        
    </TouchableOpacity>
  );


const Home = (
    props,
    {data = DATA,
    height = defaults.height,
    width = defaults.width,
    delay = defaults.delay,
    onPress = handlePress,
    ItemElement = Itema,}
    ) => {

    const [selectedId, setSelectedId] = useState();
  const [selectedIndex, setselectedIndex] = useState(0);
  const scrollView = useRef();


  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#FFFF33' : '#ffff';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
      />
    );
  };

  const renderItemNew = ({item}) => {

    return (
      <ItemNew
        item={item}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };

  const renderItemPo = ({item}) => {

    return (
      <ItemPo
        item={item}
        onPress={() => setSelectedId(item.id)}
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


    return (
        <View style={styles.container}>
                <View style={styles.herder}>
                    <Text style={{fontSize:30, marginLeft: 20}}>Logo</Text>
                    <TouchableOpacity style={{marginLeft: 220}}>
                        <Image style={{width:25, height:25}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2832/2832495.png"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 30}} onPress={()=>{props.navigation.navigate('Home')}}>
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

                        <View style={{marginHorizontal:10, marginTop: 10}}>
                            <SafeAreaView>
                                <FlatList
                                    horizontal
                                    data={CATEGORY}
                                    keyExtractor={item => item.id}
                                    extraData={selectedId}
                                    renderItem={renderItem}
                                />        
                            </SafeAreaView>
                            <Text style={{marginTop:10, fontSize:20}}>New In</Text>

                            <SafeAreaView style={{marginTop:10}}>
                                <FlatList
                                    horizontal
                                    data={PRO}
                                    keyExtractor={item => item.id}
                                    extraData={selectedId}
                                    renderItem={renderItemNew}
                                />        
                            </SafeAreaView>
                            <Text style={{marginTop:20, fontSize:20}}>Popular Items</Text>

                            <SafeAreaView style={{marginTop:10}}>
                                <FlatList
                                    horizontal
                                    data={PRO}
                                    keyExtractor={item => item.id}
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

