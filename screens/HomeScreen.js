import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Button,
  Image
} from 'react-native';
import {StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import axios from 'axios';

const styles = StyleSheet.create({
  title:{
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
})

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // mapStateToProps()

    // axios({
    //   method: 'get',
    //   url: 'https://jsonplaceholder.typicode.com/posts',
      
    // })
    //   .then(function(response) {
    //     console.log(response)
    //   // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    // });
     

    
    
    // console.log("HomeScreen = > ", this.props)
    // console.log("Dispatch ", this.props.dispatch)
  }

  test = async () => {
    await  console.log("HomeScreen Function Test") 
  }

  testFunction= (props) => {
    console.log("Home => " )
  }

  handleBtnPress = () => {
    console.log("Test Button pressed")
    this.props.navigation.toggleDrawer();
  }
 
  render() {
    return (
      <View>
        <Swiper>
          <View>
            <Image>
              
            </Image>
          </View>
        </Swiper>
        <Text style={styles.title} >Home</Text>
        <Button title={"Mod Store"} onPress={this.props.dispatchAction}>Mod Store</Button>
      </View>
    )
  }
}
function mapStateToProps (state){
  return{
    store:state
  }
}

// Allows one to modify the state in the store. (Increase the counter by 1)
function mapDispatchToProps(dispatch){
  return({   
    dispatchAction:() => {
      dispatch ({type:"ADD_USER"})
    }
  });
};
  
export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);