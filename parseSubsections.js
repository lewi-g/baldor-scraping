require('dotenv').config()
const axios = require('axios')
const $ = require('cheerio')
const getItemInfo = require('./getItemInfo')
const axiosConfig = require('./axiosConfig')

const parseSubsections = async (allItems, products, section) => {
  const url = `https://www.baldorfood.com${section}`
  const res = await axios.get(url, axiosConfig)
  products[section] = []

  $('a.subcat-l-title', res.data).each((i, item) => {
    const subsectionName = item.attribs.href

    products[section].push({
      name: subsectionName,
    })

    getItemInfo(allItems, products[section][i])
  })
}

module.exports = parseSubsections
