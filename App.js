import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, SafeAreaView } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {SearchBar} from 'react-native-elements';


//SearchBar
export class Search extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    search: '',
  };
  
  
  updateSearch = (search) => {this.setState({search});
  };
  
  render() {
    const {search } = this.state;
    console.log(this.state)
  
    return (
      <SearchBar
        lightTheme="true"
        placeholder= {this.props.placeholder}
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
 }


const d = Dimensions.get('window');

export default function App() {
  
 return (
   <View>
    <ImageZoom cropWidth={d.width+100}
                      cropHeight={d.height+100}
                      imageWidth={d.width+300}
                      imageHeight={d.height+100}
                      maxOverflow={200}>
               <ImageBackground style={styles.image}
                      source={{uri:'https://www.mit.edu/files/images/201807/15656704711_00457bd2c9_b_1.jpg'}}/>
  </ImageZoom>
   <SafeAreaView style={styles.container}>
   <Search style= {styles.searchbar} placeholder="Start"> </Search>
   <Search style={styles.searchbar} placeholder="End"> </Search>
  </SafeAreaView>

  </View>
  
  


 );
}


const styles = StyleSheet.create({
 container: {
   
   flex:1,
   //justifyContent:'center',
   width:'50%',
   //alignContent:'center',
   position:'absolute',

   //backgroundColor: '#fff',

   //justifyContent:'space-evenly',
  
 },
 image: {
  width:d.width+300,
  height:d.height+100,
  resizeMode: 'cover',

 },
searchbar:{
  

},
});
