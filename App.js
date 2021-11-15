import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import { SearchBar, Button } from "react-native-elements";
import { useState } from "react";
import Directions from "./Directions.js";
import Search from "./Search.js";
import { addNode, addEdge } from "./firebase.js";

const d = Dimensions.get("window");

export default function App() {
  const [data, setData] = useState("");
  const [newNode, setNewNode] = useState("");
  const updatePath = (pathData) => {
    setData(pathData);
  };
  const createNode = async () => {
    console.log("aaaa - starting");
    try {
      await addNode("0start_test");
      await addNode("1end_test");
      const edgeRef = await addEdge("0start_test", "1end_test", 40);
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
        <TextInput
          value={newNode}
          onChangeText={setNewNode}
          placeholder="Enter new Node name!"
        />
        <Button onPress={createNode} title="Create node" />
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
