require('dotenv').config();
const store = require('./REDUX/store');
const User = require('./models/User');
const jwt = require ('jsonwebtoken')
const userLoginAction = require ('./REDUX/actions/action');
const argon2 = require('argon2');
const user = []
const unsubscribe = store.subscribe(() => { 
  return console.log('State after dispatch', store.getState())})

const resolvers = {
    Query: {
        // Query all Users. 
        allUsers: async () => {
            await User.findAll()
            .then (res => {
                res.map((data) => {
                  user.push(data.dataValues)
                  console.log(data.dataValues)
                })
            })
            .catch(error => {
                console.log(error)
              })
            return user
        },    
        // Authenticate user login information and generate user access and refresh tokens.
        userAuth: async (parent, args, context, info) => {
          let passValid = null;
          await User.findOne({where: {email : args.email}})
          .then ((res,req) => {
            if( res === null){
              console.log("This user is not in the database.")
              return passValid = false;
            } else if (args.password === res.dataValues.password && args.email === res.dataValues.email ) {
              return passValid = true;
              }
          })
          .catch(error => {
            console.log(error)
          })
          updateUserTokens = (id) => {
            // // Generate token.
          const accessToken = generateAccessToken ("User")
          const refreshToken = generateRefreshToken ("UserRefresh")

          // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
          // const data = { accessToken:accessToken, refreshToken:refreshToken }
          const intId = parseInt(id, 10)
          console.log("Int Id", intId)

          function generateAccessToken (user) {
            let usr = {user:JSON.stringify(user)}
            let access = { generatedToken : JSON.stringify(process.env.ACCESS_TOKEN_SECRET) }
            return jwt.sign(usr, access.generatedToken, {expiresIn:'14d'})
          }

          function generateRefreshToken (user) {
            let usr = {user:JSON.stringify(user)}
            let access = { generatedRefreshToken : JSON.stringify(process.env.REFRESH_TOKEN_SECRET) }
            return jwt.sign(usr, access.generatedRefreshToken, {expiresIn:'14d'})
          }

          // function authenticatetoken (req, res, next) {
          //   const authHeader = req.headers['authorization']
          //   const token = authHeader && authHeader.split(' ')[1]
          //   if (token == null ) return res.sendStatus(401)
          
          //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          //     if (err) return res.sendStatus(403)
          //     req.user = user
          //     // console.log("User ",user)
          //     next()
          //   })
          // }

            User.update({
              accesstoken: accessToken,
              refreshtoken: refreshToken
            }, {
              where: {id: intId}
            })
            .then( async function(res){
              console.log("accesstoken => ", accessToken);
              console.log("accesstoken => ", refreshToken);

            }).catch(error => {
              console.log(error)
            })
           
          }
          if(passValid){
            await updateUserTokens(8)
          }
          return passValid;
        },    
    },

    Mutation: {
        async createUser(parent, args, context, info) {
          await User.create({
              username:args.username,
              email: args.email,
              password: args.password,
            })
            .then(function(res){
              console.log("Just ADDED => ",res, " to the database.", args) 
            })
            .catch(error => {
              console.log(error)
            })
            return 1;
        } ,

        // Updates users accesstoken and refreshtoken.
        async UpdateUserTokens (parent, args, context, info) {
          
          // // Generate token.
          const accessToken = generateAccessToken ("User")
          const refreshToken = generateRefreshToken ("UserRefresh")

          // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
          // const data = { accessToken:accessToken, refreshToken:refreshToken }
          const intId = parseInt(args.id, 10)
          console.log("Int Id", intId)

          function generateAccessToken (user) {
            let usr = {user:JSON.stringify(user)}
            let access = { generatedToken : JSON.stringify(process.env.ACCESS_TOKEN_SECRET) }
            return jwt.sign(usr, access.generatedToken, {expiresIn:'14d'})
          }

          function generateRefreshToken (user) {
            let usr = {user:JSON.stringify(user)}
            let access = { generatedRefreshToken : JSON.stringify(process.env.REFRESH_TOKEN_SECRET) }
            return jwt.sign(usr, access.generatedRefreshToken, {expiresIn:'14d'})
          }

          // function authenticatetoken (req, res, next) {
          //   const authHeader = req.headers['authorization']
          //   const token = authHeader && authHeader.split(' ')[1]
          //   if (token == null ) return res.sendStatus(401)
          
          //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          //     if (err) return res.sendStatus(403)
          //     req.user = user
          //     // console.log("User ",user)
          //     next()
          //   })
          // }

           await User.update({
              accesstoken: accessToken,
              refreshtoken: refreshToken
            }, {
              where: {id: intId}
            })
            .then( async function(res){
              // Insert access and refresh tokens to Redux and then add to async storage from login screen when process 
              // of adding to DB is complete.



              console.log("accesstoken => ", accessToken);
              console.log("accesstoken => ", refreshToken);

            }).catch(error => {
              console.log(error)
            })
           console.log
           return user;
        }
    },
}


// function mapStateToProps (state){
//   return{
//     store:state
//   }
// }

// // Allows one to modify the state in the store. (Increase the counter by 1)
// function mapDispatchToProps(dispatch){
//   return({   
//     dispatchAction:(data) => {
//       // not sure how to transfer the data I put in here to the app.js component.
//       // dispatch ({type:'RESET_LOGIN_STATUS'})
      
//     }
//   });
// };

module.exports = (resolvers);
// module.exports = {
//   method: function() {return console.log("hello world")}
// };
// module.exports = connect(mapStateToProps,mapDispatchToProps);