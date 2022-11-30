/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import type {Node} from 'react';
import {StyleSheet,Text,useColorScheme,View,Dimensions} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Provider } from 'react-redux';
import store from './REDUX/store';
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import QuigglyApp from './src/QuigglyApp';

const client = new ApolloClient({
  // httpLink
  uri:'http://192.168.0.3:4001/graphql'
  // cache: new InMemoryCache()
})

// removed ": Node" because this is not a typescript file.
const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
// function App () {
function App () {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Header />
    //     <View
    //       style={{
    //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //       }}>
    //       <Section title="Step One">
    //         Edit <Text style={styles.highlight}>App.js</Text> to change this
    //         screen and then come back to see your edits.
    //       </Section>
    //       <Section title="See Your Changes">
    //         <ReloadInstructions />
    //       </Section>
    //       <Section title="Debug">
    //         <DebugInstructions />
    //       </Section>
    //       <Section title="Learn More">
    //         Read the docs to discover what to do next:
    //       </Section>
    //       <LearnMoreLinks />

           <Provider store={store}>
          <ApolloProvider client={client}>

          <QuigglyApp/>
          </ApolloProvider>
          </Provider> 
          
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>

// {/* <Provider store={store}>
// <ApolloProvider client={client}>
//   <QuigglyApp/>
// </ApolloProvider>
// </Provider> */}
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

                       /**
 
//  *
// //  * @format
// //  * @flow
// //  */
// // import 'react-native-gesture-handler';
// import React, { useState, useEffect } from 'react';
// import QuigglyApp from './screens/navigator/screensStack';
// import { Provider } from 'react-redux';
// // import { createStore } from 'redux';
// import { ApolloProvider, useQuery } from "@apollo/react-hooks";
// import ApolloClient from "apollo-boost";
// import axios from 'axios';
// import store from './REDUX/store';
// import 'node-libs-react-native/globals';
// // import'./app.js';


// // This is where I would establish the database info to be imported for the app.
// // const initialState = {
// //   usersInDB:[],
// //   tokens:[]
// //   // dbFinishedLoad:''
// // }

// // Checking to see if db is loaded into store.
// // let dbFinishedLoad = null;

// // const httpLink = createHttpLink({
// //   uri: 'http://localhost:4000/graphql'
// // })

// const client = new ApolloClient({
//   // httpLink
//   uri:'http://192.168.0.3:4001/graphql'
//   // cache: new InMemoryCache()
// })
// const resObjects = [];
// // const bburner = "Bburner@gmail.com"
// // const password = "pass"
// userDbReq =  async () => {
//   const res = []
//   // console.log("Before axios request is made")
//    await axios({
//     url: 'http://192.168.0.3:4001/graphql',
//     method: 'post',
//     data: {
//       query:`query{
//         allUsers{
//           id
//           username
//           email
//           password
//           accesstoken
//           refreshtoken
//         }
//       }`
//     }
//   })
//    .then( async function(response){
//      const resObj = response.data.data.allUsers;
//      await resObj.map((user) => {
//       // console.log("Individual Users ",  user)
//       // console.log("resObjects", resObjects)
//       resObjects.push(user);
    
//      })

//       // console.log("res object to be parsed ",response.data.data.allUsers)
      
//       // response
//       // dbFinishedLoad = true;
//   })
//   .catch((err) => {
//       console.log(err.request)
//   })
//   // console.log("After axios request is made")
//   // console.log("res in function", res)
//   // return res
  
// }

// // userAuthReq = async () => {
// //   await axios({
// //     url: 'http://192.168.0.3:4001/graphql',
// //     method: 'post',
// //     data: {
// //       query:`query{
// //         userAuth(
// //           email: "${bburner}",
// //           password: "${password}"
// //           )
// //           {id username email accesstoken refreshtoken}
          
        
// //       }`
// //     }
// //   })
// //    .then( async function(response){
// //      console.log('App Response from userAuth Axios Req =>',response)
    
// //      })
// //   .catch((err) => {
// //       console.log(err.request)
// //   })
// // }

// // These reducers will modify the database information and read from the database for the whole app as well.
// // Need to add an action.
// // const reducer =  (state = initialState, action) => {
// //   const newState = {
// //     users:[]
// //   }
// //   if (state.usersInDB.length === 0){
// //     // console.log("Length of usersInDB array is less than zero on start up")
// //     action.type = "INITIAL_DB_REQ";
// //   } else {
// //     console.log("The length of users array is greater than zero")
// //   }

// //   // Needs to get into these actions when the state in the store is being modified.

// //   switch(action.type){
// //     case "INITIAL_DB_REQ":  
// //     userDbReq()
// //     newState.users.push(resObjects)
// //     return newState;

// //     // dbFinishedLoad = false
// //       // console.log("We will begin initial db request.")
    
// //   //Add User to DB
// //     // case 'ADD_USER':
// //     //   newState.userName = action.data.name
// //     //   newState.userEmail = action.data.email
// //     //   newState.userPassword = action.data.password
// //     //   console.log("Just before returning the state",initialState)
      
// //     //   return newState;
// //     //Read all Users in DB
// //     // Update User in DB
// //     // Delete User in DB
// //   }
// //   return state
// // }

// // const store = createStore(reducer)
// // console.log("Store" , store.getState())

// // store.subscribe(() => {
// //   console.log('Store updated!', store.getState());
// // })

// function App () {
//   const [usersInDB, setusersInDB] = useState();
 
//   useEffect(() => {
//     // userAuthReq()
//     // await userDbReq();
//     // console.log("Store in APP => ", store.getState())
    
//   })
//   //  setusersInDB(0)
//   return ( 
    // <Provider store={store}>
    //   <ApolloProvider client={client}>
    //     <QuigglyApp/>
    //   </ApolloProvider>
    // </Provider>
//   );
// };

// export default App;