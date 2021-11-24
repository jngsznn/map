import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
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
import { useState } from "react";
import Directions from "./Directions.js";
import Search from "./Search.js";
import { addNode, addEdge, getGraph } from "./firebase.js";

const d = Dimensions.get("window");

export default function App() {
  let [graph, setGraph] = useState(null);
  //This will be ran only once (at the beginning)
  useEffect(async () => {
    graph = await getGraph();
    setGraph(graph);
    console.log("Graph found!");
    console.log(graph);
    console.log("bbbb");
  }, []);

  const [data, setData] = useState("");
  const updatePath = (pathData) => {
    setData(pathData);
  };
  const createNode = async () => {
    console.log("aaaa - starting");
    try {
      await addNode("a", 100, 100, 0); //n1
      await addNode("b", 100, 200, 0); //n2
      await addNode("c", 200, 200, 0); //n3
      await addNode("d", 300, 300, 1); //n4
      await addNode("e", 100, 350, 0); //n5
      await addNode("f", 50, 200, 0); //n6
      await addNode("g", 50, 100, 0); //n7
      await addNode("h", 100, 400, 0); //n8
      await addNode("i", 100, 50, 1); //n9
      await addNode("j", 300, 50, 0); //n10
      await addEdge("a", "b", 0);
      await addEdge("a", "c", 0);
      await addEdge("a", "g", 0);
      await addEdge("b", "c", 0);
      await addEdge("c", "d", 0);
      await addEdge("d", "h", 0);
      await addEdge("e", "f", 0);
      await addEdge("e", "h", 0);
      await addEdge("f", "g", 0);
      await addEdge("f", "i", 0);
      await addEdge("i", "j", 0);
      console.log("hehe");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log("aaaa - ending");
  };
  return (
    <View style={styles.background}>
      <ImageZoom
        cropWidth={d.width}
        cropHeight={d.height - 200}
        imageWidth={d.width}
        imageHeight={d.height}
        maxOverflow={500}
      >
        <ImageBackground
          style={styles.image}
          source={{
            uri: "https://www.mit.edu/files/images/201807/15656704711_00457bd2c9_b_1.jpg",
          }}
          style={{ width: d.width, height: d.height - 100 }}
        >
          <Directions start_end={data} />
        </ImageBackground>
      </ImageZoom>

      <SafeAreaView style={styles.container}>
        <Search style={styles.searchbar}> </Search>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "yellow",
  },
  container: {
    //flex:1,
    //justifyContent: 'flex-end',
    backgroundColor: "green",
    //justifyContent:'center',
    width: "100%",
    //alignContent:'center',
    //position:'absolute',

    //backgroundColor: '#fff',

    //justifyContent:'space-evenly',
  },
  image: {
    width: d.width + 300,
    height: d.height + 100,
    //resizeMode: 'cover',
  },
  searchbar: {
    //width:d.width+300,
    //height:d.height+100,
  },
});
