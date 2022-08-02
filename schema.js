const { gql } = require('apollo-server');

const typeDefs = gql`
    type Text {
        title:String
    }
    type User {
        id: Int
        username: String
        email: String
        password:String
        accesstoken:String
        refreshtoken:String
    }
    type Book {
        title: String
        author: String
      }
    type Mutation {
        createUser(username: String!,email: String!,password: String!): User!
        UpdateUserTokens(id: String!, accesstoken: String!, refreshtoken:String!):User!
    }  
    type Query {
        allUsers:[User]
        userAuth(email: String!,password: String!): Boolean!
    }
    
`;

module.exports = typeDefs;