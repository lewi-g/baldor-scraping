require('dotenv').config()
const axios = require('axios')
const $ = require('cheerio')
const axiosConfig = require('./axiosConfig')
const parseSubsections = require('./parseSubsections')

const parseSections = async (home) => {
  const url = 'https://www.baldorfood.com'
  const products = {}
  const res = await axios.get(url, axiosConfig)

  $('a.menu-fi-item', res.data).each((i, item) => {
    const sectionURL = item.attribs.href
    products[sectionURL] = sectionURL
    parseSubsections(products, sectionURL)
  })
}

parseSections()
