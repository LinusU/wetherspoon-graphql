const { gql } = require('apollo-server')

exports.typeDefs = gql`
  type ProductGroup {
    description: String
    products: [Product]
  }

  type SubMenu {
    headerText: String
    productGroups: [ProductGroup]
  }

  type Menu {
    id: ID!
    show: Boolean
    canOrder: Boolean
    image: Image
    useLocalIncludesDrink: Boolean
    description: String

    subMenu: [SubMenu]
  }
`

exports.resolvers = {
  ProductGroup: {
    description: (item) => item.groupDescription
  },

  Menu: {
    id: (item) => String(item.menuId),
    image: (item) => ({ height: item.imageHeight, url: item.image, width: item.imageWidth })
  }
}
