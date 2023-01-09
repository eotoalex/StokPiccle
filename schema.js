const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
  } = require('graphql')

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'HelloAlexMan',
      fields: () => ({
        message: {
          type: GraphQLString,
          resolve: () => 'Hello World'
        }
      })
    })
  })

  module.exports = schema;