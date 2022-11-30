
// import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import { createStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import Wigglies from '../screens/BidScreen';
import Register from '../screens/Register';
// import userLoginReset from '../REDUX/actions/action';
import store from '../REDUX/store.js';
import action from '../REDUX/actions/action'

import ChatScreen from '../screens/ChatScreen';
import BidScreen from '../screens/BidScreen';

// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();



const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const QuiggliesStack = createStackNavigator();
const WiggliesStack = createStackNavigator();
const RegisterStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const LoginStack = createStackNavigator();
const StoreContext = React.createContext('test store');

// Both these stacks will be using Socket.io to provide live peer-to-peer communication.
const ChatStack = createStackNavigator();
const BidStack = createStackNavigator();

 
  class QuigglyApp extends Component {
  constructor(props) {
    super(props);
    }

  componentDidMount() {
    console.log("Props in Quiggly app OnComponentDidMount", this.props.store)
    
    }
  HomeStackScreen = ({navigation}) => {
    let isSignedIn = false;

    return(
      <HomeStack.Navigator
      screenOptions = {{ headerStyle: {
        backgroundColor: 'purple',
      },
      headerTintColor: '#333',
      headerTitleStyle: {
        fontWeight:'bold',
      },
      }}
      >
        <HomeStack.Screen 
        name={"Home"} 
        component={HomeScreen} 
        options={{
          headerLeft: () => (
            <Icon.Button 
              name='ios-menu' 
              size={25} 
              backgroudColor="white" 
              onPress={() => {navigation.openDrawer()}}
            />
          )
        }}/>  
      </HomeStack.Navigator>
    )
  }
  ProfileStackScreen = ({navigation}) => {
    return(
      <ProfileStack.Navigator>
        <ProfileStack.Screen 
          
          name={"Profile"} 
          component={Profile}
          options={{
            headerLeft: () => (
              <Icon.Button 
                name='ios-menu' 
                size={25} 
                backgroudColor="white" 
                onPress={() => {navigation.openDrawer()}}
              />
            )
          }}/>  
          
      </ProfileStack.Navigator>
    )
  }
  QuigglyStackScreen = ({navigation}) => {
    return(
      <QuiggliesStack.Navigator>
        <QuiggliesStack.Screen 
          name={"Login"} 
          component={Login}
          options={{
            headerLeft: () => (
              <Icon.Button 
                name='ios-menu' 
                size={25} 
                backgroudColor="white" 
                onPress={() => {navigation.openDrawer()}}
              />
            )
          }}/>  
          
      </QuiggliesStack.Navigator>
    )
  }
  // LogoutStackScreen = ({navigation}) => {
  //   const logoutFunction = async () => {
  //     await store.dispatch(action.userLoginReset())
  //     await navigation.navigate("Login")
  //     navigation.navigate("Login")
  //     console.log("Login status after onPress => ", this.props.store)
  //   }

  //   logoutFunction()
    
    
  //   return(
  //     <QuiggliesStack.Navigator>
  //       <QuiggliesStack.Screen 
  //         name={"Login"} 
  //         component={Login}
  //         options={{
  //           headerLeft: () => (
  //             <Icon.Button 
  //               name='ios-menu' 
  //               size={25} 
  //               backgroudColor="white" 
  //               onPress={() => {navigation.openDrawer()}}
  //             />
  //           )
  //         }}/>  
  //     </QuiggliesStack.Navigator>
  //   )
  // }
  // WiggliesStackScreen = ({navigation}) => {
  //   return(
  //     <WiggliesStack.Navigator>
  //       <WiggliesStack.Screen 
  //         name={"Wigglies"} 
  //         component={Wigglies}
  //         options={{
  //           headerLeft: () => (
  //             <Icon.Button 
  //               name='ios-menu' 
  //               size={25} 
  //               backgroudColor="white" 
  //               onPress={() => {navigation.openDrawer()}}
  //             />
  //           )
  //         }}/>  
  //     </WiggliesStack.Navigator>
  //   )
  // }
  // RegisterStackScreen = ({navigation}) => {
  //   return(
  //     <RegisterStack.Navigator>
  //       <RegisterStack.Screen 
  //         name={"Register"} 
  //         component={Register}
  //         options={{
  //           headerLeft: () => (
  //             <Icon.Button 
  //               name='ios-menu' 
  //               size={25} 
  //               backgroudColor="white" 
  //               onPress={() => {navigation.openDrawer()}}
  //             />
  //           )
  //         }}/>  
          
  //     </RegisterStack.Navigator>
  //   )
  // }
  // ChatStackScreen = ({navigation}) => {
  //   return(
  //     <ChatStack.Navigator>
  //       <ChatStack.Screen 
  //         name={"ChatScreen"} 
  //         component={ChatScreen}
  //         options={{
  //           headerLeft: () => (
  //             <Icon.Button 
  //               name='ios-menu' 
  //               size={25} 
  //               backgroudColor="white" 
  //               onPress={() => {navigation.openDrawer()}}
  //             />
  //           )
  //         }}/>  
  //     </ChatStack.Navigator>
  //   )
  // }
  // BidStackScreen = ({navigation}) => {
  //   return(
  //     <BidStack.Navigator>
  //       <BidStack.Screen 
  //         name={"BidScreen"} 
  //         component={BidScreen}
  //         options={{
  //           headerLeft: () => (
  //             <Icon.Button 
  //               name='ios-menu' 
  //               size={25} 
  //               backgroudColor="white" 
  //               onPress={() => {navigation.openDrawer()}}
  //             />
  //           )
  //         }}/>  
  //     </BidStack.Navigator>
  //   )
  // }

  // MyStack = () => {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name="Home" component={HomeScreen} />
  //       {/* <Stack.Screen name="Notifications" component={Notifications} />
  //       <Stack.Screen name="Profile" component={Profile} />
  //       <Stack.Screen name="Settings" component={Settings} /> */}
  //     </Stack.Navigator>
  //   );
  // }
  createDrawerNavigator = () => {
    let isLoggedIn = null;
    let initialScreen = null;
    let isLoggedInStack = null;
    const loginBool = this.props.store.login
    const logoutFunction = () => {
      store.dispatch(action.userLoginReset())
    }
    
    if (loginBool) {
      // The user is logged in here.
      isLoggedIn = "Logout"
      initialScreen = "Profile"
      isLoggedInStack = this.LogoutStackScreen
    } else {
      // The user is NOT logged in here.
      isLoggedIn = "Login"
      initialScreen = "Login"
      // Need to change this to LoginStackScreen.
      isLoggedInStack = this.QuigglyStackScreen
    }

    // console.log("props in quiggly app 8765 ", this.props.store)

    return(
      <Drawer.Navigator initialRouteName={initialScreen}>
  
        <Drawer.Screen name={"Home"} component={HomeScreen}/>
        <Drawer.Screen name={"Login"} component={Login}/>
        {/* <Drawer.Screen name={"Wigglies"} component={this.WiggliesStackScreen}/>  */}
        {/* <Drawer.Screen name={"Register"} component={this.RegisterStackScreen}/>   */}
        {/* <Drawer.Screen name={"ChatScreen"} component={this.ChatStackScreen}/> 
        <Drawer.Screen name={"BidScreen"} component={this.BidStackScreen}/>  */}
        {/* <Drawer.Screen name={isLoggedIn} component={isLoggedInStack}/>  */}
      
      </Drawer.Navigator>
    );
  }

  render(){
    return (


      <StoreContext.Provider value="dark"> 
        <NavigationContainer>
        {/* <Stack.Navigator initialRouteName={HomeScreen}>
          <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
          />
      </Stack.Navigator> */}

         {/* <Stack.Navigator>{<View></View>}</Stack.Navigator> */}
         
        {/* {this.HomeStackScreen()} */}
          {this.createDrawerNavigator()}
        </NavigationContainer> 
      </StoreContext.Provider>  

    );
  }
};

// Getting the state.counter from the store and mapping it to a prop called counter.
function mapStateToProps (state){
  return{
    store:state
  }
}
// Allows one to modify the state in the store.
function mapDispatchToProps(dispatch){
  return({   
    dispatchAction:() => {
      dispatch ({type:"ADD_USER"})
    }
  });
};

// connect() connects the counter prop we created in mapStateToProp to QuigglyApp props.
  export default connect(mapStateToProps,mapDispatchToProps)(QuigglyApp);
