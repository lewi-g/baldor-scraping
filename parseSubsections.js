require('dotenv').config()
const axios = require('axios')
const $ = require('cheerio')
const getItemInfo = require('./getItemInfo')
const axiosConfig = require('./axiosConfig')

const parseSubsections = async (products, section) => {
  const url = `https://www.baldorfood.com${section}`
  const res = await axios.get(url, axiosConfig)

  products[section] = []

  $('a.subcat-l-title', res.data).each((i, item) => {
    subsectionName = item.attribs.href

    products[section].push({
      name: subsectionName,
    })

    getItemInfo(products[section][i])
  })
}

module.exports = parseSubsections
