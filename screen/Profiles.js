import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View , Alert, TextInput, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import MyFlatList from '../components/MyFlatList';
import SetUp from "../screen/SetUp"

const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key,value)
    } catch (error) {

    }
}

const getData = async (key) => {
    try {
      let data = await AsyncStorage.getItem(key);
      return data;
    } catch(error) {
      // error reading value
      return "null";
    }
}

export default function Profiles(){
    const [isFocused1, setIsFocused1] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [VideoURL,setVideoURL] = useState("");
    const [ServerURL,setServerURL] = useState("");

    useEffect(() => {
        async function getVideoURL(){
            let videoURL = await getData("VideoURL");
            setVideoURL(videoURL);
        }
        async function getServerURL(){
            let serverURL = await getData("ServerURL");
            setServerURL(serverURL);
        }
        getVideoURL();
        getServerURL();
    },[]);

    return (
        <View style = {styles.container} >
            <View style = {{marginTop:20}}><Text style = {styles.mainText}>VideoURL</Text></View>
            <TextInput 
                style = {[styles.textInput,isFocused1 ? styles.focused : null]}
                defaultValue = {VideoURL}
                placeholder = "VideoURL"
                onFocus={() => setIsFocused1(true)}
                onBlur={() => setIsFocused1(false)}
                onChangeText={(text) => setVideoURL(text)}
            />
            <View><Text style = {styles.mainText}>SeverURL</Text></View>
            <TextInput
                style = {[styles.textInput,isFocused2 ? styles.focused : null]}
                defaultValue = {ServerURL}
                placeholder = "ServerURL"
                onFocus={() => setIsFocused2(true)}
                onBlur={() => setIsFocused2(false)}
                onChangeText={(text) => setServerURL(text)}
            />
            <View style = {{height:60,alignItems:'center',marginTop: 40}}>
                <TouchableOpacity
                    onPress={async () => {
                            // navigation.navigate('HomePage',{videoURI:videoURI,serverURL:serverURL})//前面videoURI是属性名，后面videoURI是参数(从useState里取)
                            storeData("VideoURL",VideoURL);
                            storeData("ServerURL",ServerURL);
                            Alert.alert("Saved")
                        }
                    }
                    
                >
                    <View style = {{height:60,width: 120,backgroundColor:'#fafafa',borderRadius:12,borderColor:"green",borderWidth:1,flexDirection:'row',alignItems:'center'}}>
                        <View style = {{flex:1,alignItems:'center'}}><FontAwesome name="save" size={24} color="black" /></View>
                        <View style = {{flex:1,alignItems:'center'}}><Text style = {{color:'green',fontSize:20,paddingRight:14}}>Save</Text></View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        backgroundColor:"#fafafa",
    },
    mainText:{
        textAlign:'center',
        fontSize:20
    },
    textInput:{
        height:50,
        margin:20,
        backgroundColor:'#fafafa',
        padding:10,
        fontSize:20,
        borderRadius:10,
        borderWidth:1
    },
    focused: {
        borderColor: 'green',
        borderWidth: 2
    },
});