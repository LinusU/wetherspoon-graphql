const { gql } = require('apollo-server')

exports.typeDefs = gql`
  type Product {
    id: ID!
    name: String
    price: Int
    description: String
    includesADrink: Boolean
  }
`

exports.resolvers = {
  Product: {
    id: (item) => String(item.productId),
    name: (item) => item.displayName,
    price: (item) => Math.round(item.priceValue * 100)
  }
}
