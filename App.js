import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, SafeAreaView} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {SearchBar, Button} from 'react-native-elements';
import { useState } from 'react';
import Directions from './Directions.js';
import Search from './Search.js';
const d = Dimensions.get('window');

export default function App() {
  const [data, setData] = useState('');

  const updatePath = (pathData) => {
    setData(pathData);
  };
  
  return (
   <View style = {styles.background}>
      <ImageZoom cropWidth={d.width}
                       cropHeight={d.height-200}
                       imageWidth={d.width}
                       imageHeight={d.height}
                       maxOverflow={500}>
              <ImageBackground style={styles.image}
                       source={{uri:'https://www.mit.edu/files/images/201807/15656704711_00457bd2c9_b_1.jpg'}}
                       style={{width: d.width, height: d.height-100}}>
                  <Directions start_end = {data}/>
              </ImageBackground>
        </ImageZoom>


  <SafeAreaView style={styles.container}>
    <Search style= {styles.searchbar}> </Search>
  </SafeAreaView>
  </View>
 );
}


const styles = StyleSheet.create({
 background: {
  backgroundColor: 'yellow',
 },
 container: {
   
   //flex:1,
   //justifyContent: 'flex-end',
   backgroundColor: 'green',
   //justifyContent:'center',
   width:'100%',
   //alignContent:'center',
   //position:'absolute',

   //backgroundColor: '#fff',

   //justifyContent:'space-evenly',
  
 },
 image: {
  width:d.width+300,
  height:d.height+100,
  //resizeMode: 'cover',

 },
searchbar:{
  //width:d.width+300,
  //height:d.height+100,

},
});
