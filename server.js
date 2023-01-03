// const {graphqlExpress, graphiqlExpress} =require('apollo-server-express');
require('dotenv').config();
const {
  ApolloServer,
  AuthenticationError,

} = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
// const { method } = require('./resolvers');
var { graphqlHTTP } = require('express-graphql');

const express = require('express');
const port =4001;

// HEROKU CONNECTION
// Need a process.env for this port as well. Or look over GraphQL .env for Apollo Server.
// Set up proxy server in package.json.
// Test online database registration and server end points through apollo.
// Design login and registration page with Google, Instagram and Facebook, login for speed.

// BID SCREEN
//  Seller and Buyer price meet in the middle of the Bid or Ask and they also agree on time. Price for delivery decreases
// a percentage as the driver goes over the agreed upon time frame. 
// Investers can invest in good drivers, for a percentage. 
//  5 4 and 3 stars are in a class of their own. Quiggly will contribute to the invester pool.
//  Seller and Buyer agree on Price and Quiggly price is the percentage of the delivery fee which was agreed upon.
//  PERCENTAGE contingent on | TIME - Speed of Delivery (calculated by tracking) | CUSTOMER SERVICE - messaging, 
//  transparency, smiles |
//  | SATISFACTION - was the item the exact item, was something missing | ERRROR HANDLING - Either N/A if no error or 
//  a rating when the delivery guy fixes error (Is rated higher when averaged) => This percentage for tip (Quiggly)
//  will also be averaged in for the 5 star rating system.

// Section for Delivery News which shows the price for a delivery of a given product and connects it with Other delivery services
// to show the savings. Lists how many deliveries are currently out, how many were successful and how many have had issues, how many
// were resolved.

// PROFILE SCREEN
// Driver Blogs/Newsletter - Drivers can personalize their pages, show their badges and credentials (background check, etc.) Also, can show
// there bio and they can also post their pictures as well. Shows how many MILES traveled to deliver, how many successful deliveries,
// rating, comments left after delivery, negative comments, issues that came up and if the driver resolved the issues. (Drivers can
// put out news letters that can be subscribed to by other delivery people or customers.)

// ISSUES SCREEN
// Issues that might arise might include -> Dishonesty/Fraud, INCORRECT ORDERS, wrong addresses, no contact, mapping,
// Background checks, designs structure throughout app, lack of buy-in to reward, CONFUSION FOR USERS -- placing
// orders (Address auto* or once then auto , Type of order drop down*,ORDER DESCRIPTION, price of order, price of 
// delivery, QUIGGLY BONUS)
// Auto generate words when typing, tab to skip lines forward and back by scrolling and as user scrolls the box 
// highlights to the next or previous based on the scrolling area focus. Once highlighted the keyboard pops up.

// BACKGROUND CHECK SCREEN
// BACKGROUND CHECK - The transition to background checking might be time consuming and lift if people do not want to 
// pay, so the payment system has to be quick. We can set up paypal for this or some other money transaction, like 
// credit card transaction that is saved.

const PORT = 4000;
const db = require('./config/database');
const User = require('./models/user')
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,        
});
async function startServer() {await server.start();} 
const jwt = require ('jsonwebtoken')
const app = express();
const { useMutation, useQuery } = ('@apollo/client');
// const {gql} = require( 'graphql-tag');
async () => {
  await startServer();
  await server.installSubscriptionHandlers(httpServer);
  await server.applyMiddleware({ app});

}
app.set('trust proxy', true);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/graphql', graphqlHTTP({
  schema: typeDefs,
  // rootValue: root,
  graphiql: true,
}))


app.get('/posts',authenticatetoken, (req, res) => {
  res.json(req.user)
})
app.get('/hello', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!\n')
})

app.post('/login', (req, res) => {
const id = 8
const username = req.body
const user = {name:username}

// Creates access token.
const accessToken = generateAccessToken (user)
const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
const data = { id:id, accessToken:accessToken, refreshToken:refreshToken }

addTokenstoDB(data)
res.json({ accessToken:accessToken, refreshToken:refreshToken})
})

function addTokenstoDB (data) {
  const [updateUserTokens] = useMutation(UPDATE_TOKENS);
  const UPDATE_TOKENS = gql`
      mutation UpdateUserTokens($id: ID!) {
        updateUserTokens({id: $id, accessToken: $accessToken, refreshToken: $refreshToken }) {
          id
          username
          email 
        }
      }
    `;
  if (data){ 
    updateUserTokens({variables: {id: data.id, accessToken: data.accessToken,
      refreshToken: data.refreshToken}})
      // console.log("accessToken : ",data.accessToken,"refreshToken : ", data.refreshToken)
  } else{
    console.log("Data object is undefined")
  }
}

app.post('/token', (req, res) =>{
  //Takes refresh token from the body of the request
  const refreshToken = req.body
  console.log("Request body in Token path...", refreshToken)
})

function generateAccessToken (user) {
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn:'15s'})
}

function authenticatetoken (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null ) return res.sendStatus(401)
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    // console.log("User ",user)
    next()
  })
}
const httpServer = http.createServer(app);
// Middleware loading after server starts.
// async () => {
//   await startServer();
//   await server.applyMiddleware({app});
//   await server.installSubscriptionHandlers(httpServer);
// }

// Testing database connection (local).
db
  .authenticate()
  .then(function(res) {
  console.log('Connection has successfully been established with the database.');
  }, function (err) {
  console.log('Unable to connect to the database: ', err);
  });

// Create to database
//  User.create({
//     id:5,
//     username:"Elion Gonzalez",
//     email:"egonzalez@gmail.com",
//     password:"pass",
//   }).then(function(res){
//    console.log(res) 
//   }).catch(error => {
//     console.log(error)
//   })
//   User.create({
//     id:6,
//     username:"Elvis Presley",
//     email:"epresley@gmail.com",
//     password:"pass",
//   }).then(function(res){
//    console.log(res) 
//   }).catch(error => {
//     console.log(error)
//   })

// Read from Database
  User.findAll()
  .then (res => {
   res.map((data) => {
     console.log(data.dataValues)
   });

  })
  .catch(error => {
    console.log(error)
  });

//   const QUERY_USERS = gql`
//   query User {
//     allUsers {
//       id
//       username
//       email 
//     }
//   }
// `;
// // // Test Graphql 
// function testGqlQuery () {
  
//   const { loading, error, data } = useQuery(QUERY_USERS);
  
//     if (loading) return 'Loading...';
//     if (error) return `Error! ${error.message}`;

//     return(
//       console.log("Data =>", data)
//     )
//     }
//     testGqlQuery ()



    // function Dogs({ onDogSelected }) {
    //   const { loading, error, data } = useQuery(GET_DOGS);
    
    //   if (loading) return 'Loading...';
    //   if (error) return `Error! ${error.message}`;
    
    //   return (
    //     <select name='dog' onChange={onDogSelected}>
    //       {data.dogs.map((dog) => (
    //         <option key={dog.id} value={dog.breed}>
    //           {dog.breed}
    //         </option>
    //       ))}
    //     </select>
    //   );
    // }

// Updates database
  // User.update(
    // User.update(
    //   {username: "Pierre Sucks!!"},
    //   { where: {id: 1} }
    // )

// Delete from database
  // User.destroy(
  //   {
  //     where: {id:1}
  //   }
  // )
 
// Reset database entry.
  // User.sync({force: true}) 

app.listen(PORT, () => {
  console.log(`Express Server listening on port ${PORT}`, server.graphqlPath);
});

// http server may be unncessary if app.listen() performs the same function.
httpServer.listen({port}, () => {
  console.log(`Apollo Server listening on port ${port}`);
});


