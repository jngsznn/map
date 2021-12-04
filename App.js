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
import new_info from "./10_2_graph.json"

import ImageZoom from "react-native-image-pan-zoom";

import { SearchBar, Button } from "react-native-elements";
import Directions from "./Directions.js";
import Search from "./Search.js";
import { addNode, addEdge, getGraph, getGraph_demo } from "./firebase.js";
import {a_star} from './astar.js'
const d = Dimensions.get("window");

let nodes = null;
let edges = null;

export default function App() {
  let [path, setPath] = useState(null);
  let [nodes, setNodes] = useState(null);
  let [edges, setEdges] = useState(null);
  let [feedback, setFeedback] = useState(""); //message to display after trying to get a path
  //This will be ran only once (at the beginning)
  useEffect(async () => {
    LogBox.ignoreLogs(["Warning: Setting a timer"]); 
    // let graph = await getGraph();
    let graph = getGraph_demo();
    setNodes(graph[0]);
    setEdges(graph[1]);
  }, []);

  
  const updatePath = (start,end) => {
    console.log("Updating the path!")
    console.log(start);
    console.log(end);
    let start_index = -1;
    let end_index = -1;
    for (let i=0; i<nodes.length; i++) {
      if (nodes[i].name == start) {
        start_index = i;
      }
      if (nodes[i].name == end) {
        end_index = i;
      }
    }
    console.log('start', start)
    console.log('start_index', start_index);
    console.log('end', end)
    console.log('end_index', end_index);
    let found_path = a_star(nodes,edges,start_index,end_index);
    if (found_path == -1){
      setFeedback(`Oops! Couldn't find a path between '${start}' and '${end}'`)
    } else{
      setFeedback(`Showing path between '${start}' and '${end}'`)
    }
    console.log('Found PATH', found_path);
    setPath(found_path);
  };
  //Functin below tries to parse the JSON file and upload it to Firestore
  //Should not be called unless necessary
  //Note: If there is a lot of data, 'console.log' will break stuff so try to avoid it
  const demo_upload_firestore = async () =>{
    try{
      let nodes = new_info['nodes'];
      let n_nodes = 0
      // console.log("Starting to create the nodes...");
      // for (let node of nodes){
      //   let [name, x, y, z] = node;
      //   // console.log(`About to add '${name}' with (x, y, z) = (${x}, ${y}, ${z})`);
      //   //Creating node
      //   await addNode(name, x, y, z);
      //   n_nodes += 1
      // }
      // console.log("Done with the nodes!");
      // console.log(n_nodes)
      console.log("Starting to create the edges");
      let n_edges = 0
      let edges = new_info['edges'];

      let keys = Object.keys(edges); 
      let start_i = 0; // Out of 175728
      let end_i = 175728; //Out of 175728
      console.log(Object.keys(edges));
      for (let i = start_i; i < end_i; i++) {
        let node = Number(keys[i]);  //index
        let node_name = nodes[node][0];
        let neighbors = edges[keys[i]];
        for (let neighbor of neighbors){
          let neighbor_name = nodes[neighbor][0];
          if (node_name < neighbor_name) { //only do it once
            // console.log(`Adding edge between ${node_name} and ${neighbor_name}`);
            // Creating edge
            // await addEdge(node_name, neighbor_name, 0); //setting weight to 0 by default
            n_edges += 1;
          }
        }
      }
      console.log("Done adding edges!")
      console.log(n_edges);
    } catch(e){
      console.log('error', e);
    }
  }
  return (
    <View style = {styles.background}>
        <SafeAreaView style={styles.container}>
            <Search style={styles.searchbar} update_start_end={updatePath}/>
        </SafeAreaView>
        <Text>{feedback}</Text>

        <ImageZoom cropWidth={d.width}
                    cropHeight={d.height-85}
                    imageWidth={6800}
                    imageHeight={4400}
                    maxOverflow={1000}
                    minScale={0.01}
                    maxScale={100}
                    enableCenterFocus={false}
                    >
            <Directions path = {path} nodes = {nodes} edges = {edges} height = {4400} width = {5000} uri = {"https://drive.google.com/uc?id=1--kPRgt3169cOsD1g-kYVIGvo5YBoQZi"} />
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
