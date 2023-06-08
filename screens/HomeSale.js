import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from "react";
import { RefreshControl, Modal, Button, StyleSheet, Text, View, Image, Share, TouchableHighlight, Alert, TouchableOpacity, TextInput, ScrollView,SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import filter from 'lodash.filter';

const HomeSale = (props) => {

    
    return (
        <View style={styles.container}>
            
        </View>
    );
}

export default HomeSale

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
    }
});