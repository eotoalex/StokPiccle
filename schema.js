const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
  } = require('graphql');
  const User = require('./models/User');
  const user = [];

const UserType = new GraphQLObjectType({
  name: 'Users',
  description: 'This lists all users in the database.',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    accesstoken: { type: new GraphQLNonNull(GraphQLString) },
    refreshtoken: {type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: 'List of all Users',
      resolve: async () => {
          await User.findAll()
          .then (res => {
              res.map((data) => {
                user.push(data.dataValues)
                console.log('Data in Query=> ',data.dataValues)
              })
          })
          .catch(error => {
              console.log(error)
            })
        return (user) }
    }
  })   
})

const schema = new GraphQLSchema({
  query: RootQueryType
})


  module.exports = schema;