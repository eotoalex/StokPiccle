import React,{ useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// The Default is null, but I will make it true as I test mutations.
var addToDB = true;
var validEmail = true;
var validUsername = true;
var validPass = true;

let tester101 = "salkjflkdsa"

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    // saving error
  }
}
const getData = async () => {
  console.log("This is where we get data.")
  
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    // console.log("Parsed Data =>",jsonValue)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  //  catch(e) {
  //   // error reading value
  // }
}

// storeData(tester101)
// getData()

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
  registerLink:{
      color:"blue"
  }
});
const userInput = {
  name:'',
  email:'',
  password:'',
  secondPassword:''
};

function Register(props){
  // When the input changes, it should store in the state and then render to the page. Need to look at how useEffect works.
  // onChangeText={(text) => this.setState({text})}
  //       value={this.state.text}

  const [state, setState] = useState({
    userNameInput:"",
    emailInput:"",
    passwordInputFirst:"",
    passwordInputSecond:""
  })
  
  const inputUserName = state.userNameInput;
  const inputEmail = state.emailInput;
  const firstPass = state.passwordInputFirst;
  const secPass = state.passwordInputSecond;
// useEffect(() => {
//   // mapFunc()
//   // console.log("Props in Register Screen ", currUsersInDB)

// })

// Maps all the db data from the store.
  const mapFunc = (uName,uEmail,uPassword,uSecPassword) => {
    // storeData(tester101)
    getData()
      currUsersInDB.map((res) => {
        if(res.username && res.email && res.password){
          let usernameInDB = res.username.toLowerCase().replace(/\s+/g,'');
          let emailInDB = res.email.toLowerCase().replace(/\s+/g,'');
          return valUsernameAndEmail(usernameInDB, uName, emailInDB, uEmail,uPassword,uSecPassword)
        } 
      });
      validateEmail(uEmail)

      if (validEmail && validUsername && validPass ){
        addToDB = true;

      } else if (!validEmail || !validUsername || !validPass) {
        // Reset back to default
        validPass = true;
        validUsername = true;
        validEmail = true;
      }
  };

  // Checking if username or email already exists in the DB.
  const valUsernameAndEmail = (userInDB, userInput, emailInDB, uInEmail,firstPassword, secPassword) => {
    // console.log(userInDB, "  ", userInput);
    // console.log(emailInDB, "  ", uInEmail);

    // There needs to be a way to break out of a function after something is found.
    if (userInDB === userInput){
      // console.log(userInDB, "  ", userInput);
      validUsername = false;
    } 
    
    if(emailInDB === uInEmail){
      // console.log(emailInDB, "  ", uInEmail)
      validEmail = false;
    }

    if(firstPassword !== secPassword){
      console.log("Passwords do not Match")
      validPass = false;
    } 
  };

  // Validating email address
  const validateEmail = (uInEmail) => {
    const regex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
    return regex.test(uInEmail)
  };

  const submitForm =  async () => {
    const username = inputUserName.toLowerCase().replace(/\s+/g, '');
    const email = inputEmail.toLowerCase();
    const password = firstPass.password;
    const secPassword = secPass.secondPassword;
    
   
    // mapFunc(username, email, password, secPassword)
    console.log("INSIDE SUBMITT FORM FUNCTION");

    if (addToDB){
      console.log("addToDB", `"${inputEmail}"`, `"${firstPass}"`)

    // const inputUserName = state.userNameInput;
    // const inputEmail = state.emailInput;
    // const firstPass = state.passwordInputFirst;
    // const secPass = state.passwordInputSecond;

    // THIS FUNCTION CAN TAKE ALL THE INPUTS AND THEN I WILL PROCESS THE USER INFORMATION AGAINST THE DB IN THE BACK END.
      await axios({
      url: 'http://localhost:4001/graphql',
      method: 'post',
      responseType:'json',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      data: {
        query:`mutation {
          addUser (
            username: "${inputEmail}",
            password: "${firstPass}"
            accesstoken: "uer93487ur3984u983ur1"
            refreshtoken: "u498u30r948u30911",
          ){
          id
          username
          password
          refreshtoken
          accesstoken
              }
            }`
            } 
    })
    .then( async (res, req) => { 
      result = res.data.data;
      console.log("RESULT = ",result)
      if (result){
        store.dispatch(action.addUserAction());
      } else {
        return false
      }
    })
    .catch((err) => {
        console.log(err)
    })
     
      
      console.log("User Added")
      addToDB = null;
      
      // Clearing text input box.
      setState(() => {
        return {
          userNameInput: "",
          emailInput: "",
          passwordInputFirst: "",
          passwordInputSecond: ""         
        }
      })
      // Redirect user to their profile page.
      props.navigation.navigate("Profile")
    }

  }

  // const currUsersInDB = props.store.users[0];
  
  return (
   
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
       <KeyboardAvoidingView
      behavior={'padding'}
      style={styles.container}
    >
      <View>
        <Text style={styles.title}> Register </Text>
        <Text> Name </Text>
        <TextInput 
         
        //  clearButtonMode='always'
          type="text"
          style={styles.input}
          // put the border color in state.
          // borderColor={'red'}
          // This is where you change the color of the input box as validation of user input is done by regex.
          // What does the value signify here. Does it signify the actual rendered value?
          value = {inputUserName}
          onChangeText={(val) => {{
            setState(prevState => {
              return {...prevState, inputUserName : prevState.userNameInput = val}
            }) 
            // GET THIS INPUT INTO THE MUTATION FOR GRAPHQL TO THEN UPDATE THE DATABASE AND WE ARE GOOD
            // HOW DO I GET THE MUTATION INTO THIS PART, SHOULD I DO AN AXIOS REQUEST OR BRING IN THE COMPONENT FROM FILE.
            console.log(state.userNameInput)
          }}
          } 
        />

        <Text> Email </Text>
        <TextInput 
          ref={input => { this.textInput = input }}
          type="text"
          style={styles.input}
          value = {inputEmail}
          onChangeText={(val) => {{
            setState(prevState => {
              return {...prevState, inputEmail : prevState.emailInput = val}
            })
          }}
          }
        />

        <Text> Password </Text>
        <TextInput 
          ref={input => { this.textInput = input }}
          secureTextEntry={true}
          type="text"
          style={styles.input}
          value = {firstPass}
          onChangeText={(val) => {{
            setState(prevState => {
              return {...prevState, firstPass : prevState.passwordInputFirst = val}
            })
          }}
          }
        />

        < Text> Retype Password </Text>
        <TextInput 
          ref={input => { this.textInput = input }}
          secureTextEntry={true}
          type="text"
          style={styles.input}
          value = {secPass}
          onChangeText={(val) => {{
            setState(prevState => {
              return {...prevState, secPass : prevState.passwordInputSecond = val}
            })
          }}
          }
        />    

       

        <Button title='submit' onPress={submitForm}/>
      </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    
  )
}

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
      dispatch ({type:"ADD_USER", data:data})
    }
  });
};
  
export default connect(mapStateToProps,mapDispatchToProps)(Register);