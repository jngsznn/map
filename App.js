import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  LogBox, // For getting rid of annoying log warnings (https://github.com/facebook/react-native/issues/12981)
} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
LogBox.ignoreLogs(["Warning: Setting a timer"]); // For getting rid of annoying log warnings (https://github.com/facebook/react-native/issues/12981)

import { SearchBar, Button } from "react-native-elements";
import Directions from "./Directions.js";
import Search from "./Search.js";
import { addNode, addEdge, getGraph } from "./firebase.js";
import {a_star} from './astar.js'
const d = Dimensions.get("window");

let nodes = null;
let edges = null;

export default function App() {
  let [path, setPath] = useState(null);
  let [nodes, setNodes] = useState(null);
  let [edges, setEdges] = useState(null);
  let [searchActive, setSearch] = useState(null);
  //This will be ran only once (at the beginning)
  useEffect(async () => {
    graph = await getGraph();
    setNodes(graph[0]);
    setEdges(graph[1]);
  }, []);
  
  const updatePath = (start,end) => {
    console.log(start);
    console.log(end);
    let start_index = -1;
    let end_index = -1;
    for (let i=0; i<nodes.length; i++) {
      console.log(nodes[i].name);
      if (nodes[i].name == start) {
        start_index = i;
      }
      if (nodes[i].name == end) {
        end_index = i;
      }
    }
    setPath(a_star(nodes,edges,start_index,end_index));
  };
  
  return (
    <View style = {styles.background}>
        <SafeAreaView style={styles.container}>
            <Search style={styles.searchbar} update_start_end={updatePath}/>
        </SafeAreaView>
        <ImageZoom cropWidth={d.width}
                    cropHeight={d.height-200}
                    imageWidth={6800}
                    imageHeight={4400}
                    maxOverflow={1000}
                    minScale={0.01}
                    maxScale={100}
                    enableCenterFocus={false}>
            <Directions path = {path} nodes = {nodes} edges = {edges} height = {4400} width = {5000} uri = {"https://drive.google.com/uc?id=1--kPRgt3169cOsD1g-kYVIGvo5YBoQZi"}/>
        </ImageZoom>
  </View>
 
 );
}

const styles = StyleSheet.create({
 background: {
  //backgroundColor: 'yellow',
 },
 container: {
   
   //flex:1,
   justifyContent: 'flex-end',
   backgroundColor: 'green',
   //justifyContent:'center',
   width:'100%',

   //alignContent:'center',

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
