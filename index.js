const { ApolloServer, gql } = require('apollo-server')

const Menu = require('./entity/menu')
const Product = require('./entity/product')
const Venue = require('./entity/venue')

const typeDefs = gql`
  type PageInfo {
    hasNextPage: Boolean!
  }

  type Image {
    height: Int
    url: String!
    width: Int
  }

  type Query
`

const server = new ApolloServer({
  resolvers: [Menu.resolvers, Product.resolvers, Venue.resolvers],
  typeDefs: [typeDefs, Menu.typeDefs, Product.typeDefs, Venue.typeDefs]
})

server.listen({ port: 4119 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
