import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, SafeAreaView} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {SearchBar, Button} from 'react-native-elements';
import Directions from './Directions.js';
const d = Dimensions.get('window');

var start ="";
var end="";

//SearchBar Class
class Search extends React.Component {
  constructor(props){
    super(props);
  }
  state = {search1 :"", search2 : "",};

  
  updateStart = (search1) => {this.setState({search1});
  };
  updateEnd = (search2) => {this.setState({search2});};
  
  render() {
    start=this.state.search1;
    end=this.state.search2;
  
 
 
  
    return (
     <View>
       <SearchBar
        lightTheme="true"
        placeholder= "start"
        onChangeText={this.updateStart}
        value={this.state.search1}> 
        </SearchBar>


        <SearchBar
        lightTheme="true"
        placeholder= "end"
        onChangeText={this.updateEnd}
        value={this.state.search2}> 
        </SearchBar>    

     </View> 

      
      
   
    );
  }
 }





function Click()
{
  console.log({start});
  console.log({end});
}

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
                <Directions/>
  </ImageZoom>


   <SafeAreaView style={styles.container}>
   <Search style= {styles.searchbar}> </Search>
   
   <Button title="Find" onPress={Click}/>
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
