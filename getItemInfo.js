require('dotenv').config()
const axios = require('axios')
const $ = require('cheerio')
const axiosConfig = require('./axiosConfig')
const calcUnitPrice = require('./calcUnitPrice')

const getItemInfo = async (allItems, subsection) => {
  const url = `https://www.baldorfood.com${subsection.name}?viewall=1`
  const res = await axios.get(url, axiosConfig)

  $('.product-title-and-sku', res.data).each((i, item) => {
    const itemName = $(item).find('a').text()
    const fullPrice = $(item)
      .find('span.price')[0]
      .childNodes[0].nodeValue.slice(1, -3)
    const qty = $(item).find('span.price-unit').text()
    const sku = $(item).find('span.product-sku-inline').text()
    const unitPrice = calcUnitPrice(fullPrice, qty)

    allItems.add({
      sku,
      itemName,
      fullPrice,
      qty,
      unitPrice,
    })
  })

  console.log(subsection.name, allItems)
}

module.exports = getItemInfo
