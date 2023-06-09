import React, {useState,useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import ApolloClient from "apollo-boost";
import {StyleSheet} from 'react-native';
import axios from 'axios';
import store from '../REDUX/store.js';
import action from '../REDUX/actions/action'
// import userLoginReset from '../REDUX/actions/action';
// const argon2 = require('argon2');

const client = new ApolloClient({
  // httpLink
  uri:'http://192.168.0.3:4001/graphql'
  // cache: new InMemoryCache()
})
const resObjects = [];
// const bburner = "Bburner@gmail.com"
// const password = "pass"
userDbReq =  async () => {
  const res = []
  // console.log("Before axios request is made")
   await axios({
    url: 'http://192.168.0.3:4001/graphql',
    method: 'post',
    data: {
      query:`query{
        allUsers{
          id
          username
          email
          password
          accesstoken
          refreshtoken
        }
      }`
    }
  })
   .then( async function(response){
     const resObj = response.data.data.allUsers;
     await resObj.map((user) => {
      // console.log("Individual Users ",  user)
      // console.log("resObjects", resObjects)
      resObjects.push(user);
    
     })

      // console.log("res object to be parsed ",response.data.data.allUsers)
      
      // response
      // dbFinishedLoad = true;
  })
  .catch((err) => {
      console.log(err.request)
  })
  // console.log("After axios request is made")
  // console.log("res in function", res)
  // return res
  
}


function Login (props){
  const [state, setState] = useState({
    userEmail:"",
    userPass:"",
    logIn: store.getState().login,
  })
  
  // useEffect(() => {
   
    
  // })
  
  const email = state.userEmail;
  const password = state.userPass;

  const submitForm = async () => {

    await userAuthReq()
    
    if (store.getState().login === true){
      
      // setState(() => {
      //   return {
      //     userEmail: "",
      //     userPass: "",        
      //   }
      // })
      
      // store.dispatch(action.userLoginReset());
      

    } else {
      console.log("Not a valid user.")
      // console.log("5 After userAuthReq ", store.getState(), props.store)
      props.navigation.push('Login')  
    };

    await setState(() => {
      return {
        userEmail: "",
        userPass: "",        
      }
    })
    redToProfile()
    
  };

   userAuthReq = async () => {
    let result = null 
    // const hash = await argon2.hash(state.userPass);
    // console.log(hash)
    await axios({
      url: 'http://192.168.0.3:4001/graphql',
      method: 'post',
      responseType:'json',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      data: {
        query:`query{
                userAuth(
                  email: "${state.userEmail}",
                  password: "${state.userPass}"
                )
              }`
            } 
    })
    .then( async (res, req) => { 
      result = res.data.data.userAuth;
      if (result){
        store.dispatch(action.userLoginAction());
      } else {
        return false
      }
    })
    .catch((err) => {
        console.log(err)
    })
    return result;
  }

  const redToRegistration = () => {
    props.navigation.navigate("Register")
  }
  const redToProfile = async () => {
    await props.navigation.navigate("Profile")
  }

  const validateUserLogin = (id, accessToken, refreshToken, emailInDb, email, passwordInDb, password) => {
    
    if ( emailInDb === email && passwordInDb === password ){
      // console.log("INFO", id, accessToken, refreshToken )
      axios({
        url: 'http://192.168.0.3:4001/graphql',
        method: 'post',
        data: {
          query:`mutation {
            UpdateUserTokens( 
            id: "${id}",  
            accesstoken: "${accessToken}",
            refreshtoken:"${refreshToken}")
            {id accesstoken refreshtoken}}`         
        }
      })
      .then(function(response){
          console.log("UpdateUserTokens() RESPONSE => ",response)
      })
      .catch((err) => {
          console.log("in /login.js UpdateUserToken() ERROR",err)
      })
      // login = true
    } 
  }
  
    return (
    <View>
      <Text style={styles.title} >Login</Text>
      <Text> Email </Text>
        <TextInput 
          // ref={input => { this.textInput = input }}
          type="text"
          style={styles.input}
          value = {email}
          onChangeText={(val) => {{
            setState(prevState => {
              return {...prevState, email : prevState.userEmail = val}
            })
          }}
          }
        />
       
        <Text> Password </Text>
        <TextInput 
          // ref={input => { this.textInput = input }}
          secureTextEntry={true}
          type="text"
          style={styles.input}
          value = {password}
          onChangeText={(val) => {{
            setState(prevState => {
              return {...prevState, password : prevState.userPass = val}
            })
          }}
          }
        />
        {/* Register Link */}
         <Text 
        style={styles.registerLink}
        onPress={redToRegistration}
        > Quick Sign Up </Text>

         <Text style={styles.errMsg}>Incorrect Email and/or Password</Text>
        <Button title='submit' onPress={submitForm}/>
    </View>
    )
  // }
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
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
  input:{
      borderWidth:1,
      borderColor:'#777',
      padding:8,
      margin:10,
      width:200
  },
  errMsg:{
    color:"red",
    opacity: 100
  },
  registerLink:{
    color:"blue"
  }
});
function mapStateToProps (state){
  return{
    store:state
  }
}
// Allows one to modify the state in the store. (Increase the counter by 1)
function mapDispatchToProps(dispatch){
  return({   
    dispatchAction:(data) => {
      // not sure how to transfer the data I put in here to the app.js component.
      dispatch ({type:'RESET_LOGIN_STATUS'})
      
    }
  });
};
  
export default (Login);