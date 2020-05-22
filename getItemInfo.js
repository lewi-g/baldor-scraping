const axios = require('axios')
const cheerio = require('cheerio')
const url = 'https://www.baldorfood.com/products/fruits/apples'

const axiosConfig = {
  headers: {
    Cookie:
      "PHPSESSID:'3t0qsdt039m8e1sepic5g8kgap'; provided_access= 1; unbxd.userId='uid-1588342453957-753' ;3b765d43817d794c8078b4714265ffee='284d708a03c7396de55871232a00b459f1d6a04ba%3A4%3A%7Bi%3A0%3Bs%3A8%3A%2210141153%22%3Bi%3A1%3Bs%3A0%3A%22%22%3Bi%3A2%3Bi%3A33600%3Bi%3A3%3Ba%3A4%3A%7Bs%3A11%3A%22displayName%22%3Bs%3A0%3A%22%22%3Bs%3A6%3A%22isRoot%22%3Bb%3A0%3Bs%3A9%3A%22isBackend%22%3Bb%3A0%3Bs%3A7%3A%22profile%22%3Bs%3A6%3A%22131272%22%3B%7D%7D'",
  },
}

const getItemInformation = async () => {
  const res = await axios.get(url, axiosConfig)
  const $ = cheerio.load(res.data)

  // console.log($('div.flipper').length)
  // console.log($('.js-product-price').first().children())
  // console.log($('.prod-nb-line-sku').length)
  // console.log($('.card-product-title').first().children().first())
  // $('.card-product-title').each((i, item) =>
  //   console.log(i, $(item.children('a')))
  // )
  // console.log($('.card-product-title', res.data).first().text())
  // console.log($('span.price', res.data).first().contents())
  console.log($('.sign-in-user-widget', res.data).html()) // sign in to order is there

  // console.log($('.js_product_card', res.data).html())
  // $('.js_product_card .pct-heading h3', res.data).each((i, item) => {
  //   console.log($(item).text())
  // })
}

getItemInformation()
