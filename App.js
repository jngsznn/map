import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom'
import {SearchBar} from 'react-native-elements';

const d = Dimensions.get('window');
export class StartBar extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {this.setState({search});
  };

  render() {
    const {search } = this.state;
    const startPoint= search;

    return (
      <SearchBar
        lightTheme="true"
        input=""
        placeholder="Start"
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}
export class Destination extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {this.setState({search});
  };

  render() {
    const {search } = this.state;
    const endPoint= search;

    return (
      <SearchBar
        lightTheme="true"
        input=""
        placeholder="End"
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}

export default function App() {
  
 return (
   <View>
      <StartBar style={styles.bar}> </StartBar>
      <Destination></Destination>
      <ImageZoom cropWidth={d.width+100}
                       cropHeight={d.height+100}
                       imageWidth={d.width+300}
                       imageHeight={d.height+100}
                       maxOverflow={200}>
                <ImageBackground style={styles.image}
                       source={{uri:'https://www.mit.edu/files/images/201807/15656704711_00457bd2c9_b_1.jpg'}}/>
            </ImageZoom>
  </View>
  


  

 );
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
 image: {
  width:d.width+300,
  height:d.height+100,
  resizeMode: 'cover',
  position:'relative',
 },
 bar:
 {
   position:'absolute',


 },
});
