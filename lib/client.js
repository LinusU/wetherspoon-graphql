const got = require('got')
const KeyvRedis = require('@keyv/redis')
const stripBom = require('strip-bom')

const cache = new KeyvRedis('redis://localhost')

exports.getJson = async (url) => {
  const response = await got.get(url, { cache })
  // eslint-disable-next-line no-control-regex
  return JSON.parse(stripBom(response.body.replace(/^\x1f/, '')))
}
