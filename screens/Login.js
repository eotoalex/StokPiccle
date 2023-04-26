import React, {useState,useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import styles from '../styles'
import {StyleSheet} from 'react-native';
import axios from 'axios';
import store from '../REDUX/store.js';
import action from '../REDUX/actions/action';
import {schema} from '../schema'
import Svg, { Circle } from 'react-native-svg';
import InputIcon from './icons/inputField';
// import userLoginReset from '../REDUX/actions/action';
// const argon2 = require('argon2');

const CIK = '0001018724';
function Login (props){
  const [state, setState] = useState({
    userEmail:"",
    userPass:"",
    logIn: store.getState().login,
  })
  
 

  //TICKET SCALPING PARTITION TESTING
  //Install IMDB code from Github in order to see concert dates.
  //Install Ticket master API for event times and pricing.
  
  // TicketMaster API
  // axios.get("https://rest.bandsintown.com/artists/"+ concertSearch +"/events?app_id=codingbootcamp")
  //                       .then(function(response){
                            
  //                           var numberOfEvents = response.data.length;

                            
  //                           console.log("\nCurrent Time: " + timeStamp);
  //                           console.log("\nNumber of upcoming events found for\n "+concertSearch.split("+").join(" ")+": " + numberOfEvents);
                            

  //                           for(var i = 0; i < numberOfEvents; i++){
  //                           var concertArr = [];
  //                           var artists = response.data[i].lineup[0];    
  //                           var venue = response.data[i].venue.name;
  //                           var locationCountry = response.data[i].venue.country;
  //                           var locationRegion = response.data[i].venue.region;
  //                           var locationCity = response.data[i].venue.city;
  //                           var dates = response.data[i].datetime;

  //                           concertArr.push("\n");
  //                           concertArr.push("Artist/Band: " + artists);
  //                           concertArr.push("Venue: " + venue);
  //                           concertArr.push("Country: " + locationCountry);
  //                           concertArr.push("Region: " + locationRegion);
  //                           concertArr.push("City: " + locationCity);
  //                           concertArr.push("Event Dates: " + dates);
  //                           concertArr.push("Logged search: " + timeStamp + ",");

  //                           logToFile(concertArr);


                            
                        
  //                           console.log("\n")
  //                           console.log("Artist/Band: " + artists)
  //                           console.log("Venue: " + venue);
  //                           console.log("Location: " + locationCountry,locationRegion,locationCity);
  //                           console.log("Event dates: " + moment(dates).format('MMMM Do YYYY, h:mm:ss a'));

  //                           }
  //                       })
  //                       .catch(function onError(error) {   
                            
  //                           console.log(error);  });     
  //                       }
                    

  





  // STOCK ANALYSIS PARTITION TESTING

    // axios({
    //   method: 'get',
    //   url:`https://data.sec.gov/submissions/CIK${CIK}.json`,
    //   responseType: 'stream'
    // })
    //   .then(function (response) {
    //     console.log(
    //       response.data.name,'\n',
    //       response.data.tickers[0],'\n',
    //       response.data.cik,'\n',
    //       response.data.sic,'\n',
    //       response.data.ein,'\n',
    //       response.data.filings.files[0].name,'\n',
    //     )
    //   });
    

    //   axios({
    //     method: 'get',
    //     url:`https://data.sec.gov/api/xbrl/companyconcept/CIK${CIK}/us-gaap/AccountsPayableCurrent.json`,
    //     responseType: 'stream'
    //   })
    //     .then(function (response) {
    //       console.log(
    //         response
    //       )
    //     });



        // axios({
        //   method: 'get',
        //   url:`https://data.sec.gov/api/xbrl/companyfacts/CIK${CIK}.json`,
        //   responseType: 'stream'
        // })
        //   .then(function (response) {
        //     console.log(
        //       response
        //     )
        //   });
  

  const email = state.userEmail;
  const password = state.userPass;

  const submitForm = async () => {
    
    await userAuthReq()
    
    if (store.getState().login === true){
      
      setState(() => {
        return {
          userEmail: "",
          userPass: "",        
        }
      })
      
      store.dispatch(action.userLoginReset());
      

    } else {
      console.log("Not a valid user.")
      console.log("5 After userAuthReq ", store.getState(), props.store)
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
    
    await axios({
      url: 'http://localhost:4001/graphql',
      method: 'post',
      responseType:'json',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      data: {
        query:`query{
          users {
          
           username
           
         
           
          }
              }`
            } 
    })
    .then( async (res, req) => { 
      result = res.data.data.users;
      console.log("RESULT = ",result)
      if (result){
        store.dispatch(action.userLoginAction());
      } else {
        return false
      }
    })
    .catch((err) => {
        console.log(err)
    })

    // await axios({
    //   url: 'http://localhost:4001/graphql',
    //   method: 'post',
    //   responseType:'json',
    //   headers: {
    //     'Content-Type' : 'application/json',
    //     'Accept' : 'application/json'
    //   },
    //   data: {
    //     query:`mutation {
    //       addUser (
    //         username: "jspringer@gmail.com",
    //         password: "pass"
    //         accesstoken: "uer93487ur3984u983ur"
    //         refreshtoken: "u498u30r948u309",
           
    //       ){
    //       id
    //       username
    //       password
    //       refreshtoken
    //       accesstoken
    //           }
    //         }`
    //         } 
    // })
    // .then( async (res, req) => { 
    //   result = res.data.data;
    //   console.log("RESULT = ",result)
    //   if (result){
    //     store.dispatch(action.addUserAction());
    //   } else {
    //     return false
    //   }
    // })
    // .catch((err) => {
    //     console.log(err)
    // })


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
      {/* <Text> Email </Text> */}
      
        {/* <TextInput 
        
          // ref={input => { this.textInput = input }}
          type="text"
          
          value = {email}
          onChangeText={(val) => {{
            setState(prevState => {
              return {...prevState, email : prevState.userEmail = val}
            })
          }}
          }
        >    </TextInput> */}
        
        <InputIcon />
    
        <Text> Password </Text>
        <TextInput 
          // ref={input => { this.textInput = input }}
          secureTextEntry={true}
          // type="text"
          // style={styles.input}
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
// const styles = StyleSheet.create({
//   container: {
//     flex: 2,
//   },
//   title:{
//     marginTop: 16,
//     paddingVertical: 8,
//     borderWidth: 4,
//     borderColor: "#20232a",
//     borderRadius: 6,
//     backgroundColor: "#61dafb",
//     color: "#20232a",
//     textAlign: "center",
//     fontSize: 30,
//     fontWeight: "bold"
//   },
//   input:{
//       borderWidth:1,
//       borderColor:'#777',
//       padding:8,
//       margin:10,
//       width:200
//   },
//   errMsg:{
//     color:"red",
//     opacity: 100
//   },
//   registerLink:{
//     color:"blue"
//   }
// });
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