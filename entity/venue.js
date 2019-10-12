const { gql } = require('apollo-server')
const sortOn = require('sort-on')

const client = require('../lib/client')

exports.typeDefs = gql`
  type VenueMenus {
    menus: [Menu]
    waitTime: Int
  }

  type VenueStatus {
    isCurrentlyOpen: Boolean
    closeToday: String
    openToday: String
  }

  type VenueTable {
    id: ID!
    name: String
  }

  type Venue {
    id: ID!

    currency: String

    lat: Float
    long: Float

    canPlaceOrder: Boolean
    isAirport: Boolean
    isPubInHotel: Boolean
    pubIsClosed: Boolean
    pubIsTempClosed: Boolean
    venueCanOrder: Boolean

    name: String
    town: String
    postcode: String
    county: String
    country: String
    line1: String
    line2: String

    menus: VenueMenus
    status: VenueStatus
    tables: [VenueTable]
  }

  type VenueEdge {
    node: Venue!
    cursor: String!
  }

  type VenuePage {
    edges: [VenueEdge!]!
    pageInfo: PageInfo!
  }

  extend type Query {
    venue(id: ID!): Venue
    venues(first: Int, after: String): VenuePage
  }
`

exports.resolvers = {
  VenueMenus: {
    menus: (item) => sortOn(item.menus, 'sortOrder')
  },

  VenueTable: {
    id: (item) => String(item.tableNumber),
    name: (item) => item.tableName
  },

  Venue: {
    id: (item) => item.venueId,

    menus: ({ venueId }) => client.getJson(`https://static.wsstack.nn4maws.net/content/v2/menus/${venueId}.json`),
    status: ({ venueId }) => client.getJson(`https://dynamic.wsstack.nn4maws.net/v1/venues/status/en_gb/${venueId}.json`),
    tables: ({ venueId }) => client.getJson(`https://static.wsstack.nn4maws.net/v1/tables/en_gb/${venueId}.json`).then(data => data.tables)
  },

  Query: {
    venue: async (_, { id }) => {
      const data = await client.getJson(`https://static.wsstack.nn4maws.net/v1/venues/en_gb/${id}.json`)

      return data
    },

    venues: async (_, { first = 50, after = null }) => {
      const data = await client.getJson('https://static.wsstack.nn4maws.net/v1/venues/en_gb/venues.json')

      const start = after ? Number.parseInt(after, 10) + 1 : 0
      const edges = data.venues.slice(start, first).map((node, idx) => ({ node, cursor: String(start + idx) }))
      const pageInfo = { hasNextPage: data.venues.length > (start + first) }

      return { edges, pageInfo }
    }
  }
}
