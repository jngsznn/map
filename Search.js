import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, SafeAreaView} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {SearchBar, Button} from 'react-native-elements';

//SearchBar Class
export default class Search extends React.Component {
    constructor(props){
      super(props);
      this.state = {search1: "", search2: "", search_active: false, searched:false}
    }
  
    
    updateStart = (search1) => {this.setState({search1});};
    updateEnd = (search2) => {this.setState({search2});};


    find = () => {this.setState({search_active: false});};
    find = () => {this.setState({search_active: false});};
    
    render() {
      start=this.state.search1;
      end=this.state.search2;

      if (this.state["search_active"]) {
        return (
        <View style={styles.container}> 
            <SearchBar
            lightTheme="true"
            placeholder= "start"
            onChangeText={this.updateStart}
            round="true"
            value={this.state.search1}> 
            </SearchBar>
    
    
            <SearchBar
            lightTheme="true"
            placeholder= "end"
            round="true"
            onChangeText={this.updateEnd}
            value={this.state.search2}> 
            
            </SearchBar>    
            <Button title="Find" onPress={this.find}/>
        </View>
        );
      }
      return (
          <View style={styles.start}> 
              <Button title="New Trip" onPress={() => 
        this.setState({"search_active": true, search1: "", search2: "" })} style={styles.start}/>
          </View>
      );
    }
   }

   const styles = StyleSheet.create({
    container: {
      
    },
    start: {
      //justifyContent: 'flex-end',
      //backgroundColor: "red",
      //marginTop:
    },});