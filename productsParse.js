const axios = require('axios')
const $ = require('cheerio')
const puppeteer = require('puppeteer')

const home = 'https://www.baldorfood.com/'
const url = 'products/fruits'

const productParse = async (arr, url) => {
  await axios
    .get(url)
    .then((res) => {
      // const productSubsections = []
      $('a.subcat-l-title', res.data).each((i, item) => {
        arr.push(item.attribs.href)
      })

      // ul.nav-nav- > li.menu-item-fruits
      // console.log($('  ul.nav-nav- > li.menu-item-fruits', res.data).length)
    })
    // .then((theThing) => console.log('results!', theThing.length))
    .catch((err) => console.log('failure', err))
  console.log('allDone', arr.length)
  return arr
}

module.exports = productParse
