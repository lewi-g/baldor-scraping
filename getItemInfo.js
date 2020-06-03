require('dotenv').config()
const axios = require('axios')
const $ = require('cheerio')
const axiosConfig = require('./axiosConfig')

const items = new Set()

const getItemInformation = async (subsection) => {
  const url = `https://www.baldorfood.com${subsection.name}?viewall=1`
  const res = await axios.get(url, axiosConfig)

  $('.product-title-and-sku', res.data).each((i, item) => {
    const itemName = $(item).find('a').text()
    const fullPrice = $(item).find('span.price').text()
    const unit = $(item).find('span.price-unit').text()
    const sku = $(item).find('span.product-sku-inline').text()

    items.add({
      sku,
      itemName,
      fullPrice,
      unit,
    })
  })

  console.log(subsection.name, items.size)
}

module.exports = getItemInformation
