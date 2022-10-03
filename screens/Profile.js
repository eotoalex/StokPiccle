import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Image,
  Button
} from 'react-native';
import {StyleSheet} from 'react-native';
// import Button from '../components/Button';


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
    },
    container:{
      marginTop: 20,
      paddingVertical: 8,
      borderWidth:4,
      borderColor: "#20232a",
      borderRadius: 10,
      backgroundColor: "#61dafb",
      color: "#20232a",
      textAlign: "center",
      width:"100%",
      height:"50%"
    },
    imageContainer:{
      borderWidth:4,
      borderColor: "black",
      borderRadius: 50,
      margin:"auto",
      width:"50%",
      height:"95%",
      backgroundColor:"white",
      position:"absolute",
      left: "45%", 
      right: "10%", 
      top: "10%", 
      bottom:10
    },
    imgStyles:{
      width: 150, 
      height: 150,
      borderRadius:50,
      position:'absolute', 
      left:10,top:-3
    }
})

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
   console.log("Props in Profile => ",this.props)
  }

  handleBtnPress = () => {
    console.log("Test Button pressed")
    this.props.navigation.toggleDrawer();
  }
  
  render() {
   
    return (
      <View style={{backgroundColor:"black"}}>
        <Text style={styles.title}>Profile</Text>
        <Button title={"Mod Store"} onPress={this.props.dispatchAction}>Mod Store</Button>

        <View style={styles.container}>
          {/* User can see all Quigglies and comments. */}
          {/* <Button>Quigglies</Button> */}

          {/* User can see all Wigglies and comments. */}

          <Text
            // onPress={onPressLearnMore}
            text="Wigglies"
            outline
            onPress={() => null}
          />
          {/* User sees chores that are pending with due dates and when to pick chores next. */}
          
          <Text
            text="Open Chores"
            size="large"
            theme="secondary"
            onPress={() => null}
          />
          {/* User sees recent chores done or not done along with quigglies and wigglies associated with them. */}
        
          <Text
            text="Closed Chores"
            size="small"
            theme="secondary"
            disabled
            onPress={() => null}
          />
          {/* Agenda will have birthdates from other roomies, along with suite meetings to check in, pending discussion points like wigglies for not doing stuff or shout outs for great work on perfect chores or lending money or birthday celebrations. */}
          {/* The feel that we are working together is the vibe, like we are in this together kind of feel. */}

          <View style={styles.imageContainer}>
            {/* Seems to work when image folder is in the same folder but when outside the screens folder their seems to be an issue. */}
            <Image 
            style={styles.imgStyles}
            source={require('./images/default_img.jpeg')}
            />
          </View> 
        </View>      
    </View>
    )
  }
}
function mapStateToProps (state){
  console.log("State in Profile =>", state)
  return{
    
    counter:state.counter
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
  
export default connect(mapStateToProps,mapDispatchToProps)(Profile);