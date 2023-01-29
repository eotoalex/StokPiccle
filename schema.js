const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
  } = require('graphql');
  const User = require('./models/user');
  const users = [];

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
});

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
                users.push(data.dataValues)
                console.log('Data in Query=> ',data.dataValues)
              })
          })
          .catch(error => {
              console.log(error)
            })
        return (users) }
    }
  })   
});

const RootMutationType = new GraphQLObjectType ({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addUser: {
      type: UserType,
      description: 'Add a User',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        // accesstoken: { type: new GraphQLNonNull(GraphQLString) },
        // refreshtoken: {type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const user = {
          id: users.length + 1,
          username: args.username,
          accesstoken: args.accesstoken,
          refreshtoken: args.refreshtoken,
          password: args.password
        }
      users.push(user)
      return user;
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;