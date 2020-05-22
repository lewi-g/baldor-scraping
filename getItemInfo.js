const axios = require('axios')
const cheerio = require('cheerio')
const url = 'https://www.baldorfood.com/products/fruits/apples?viewall=1'

const axiosConfig = {
  headers: {
    Cookie:
      'PHPSESSID=kll1ru40pihvdm6087c79qd1un; SESSION=34s8l8c9lsj71toddcc9q56338',
  },
}

const getItemInformation = async () => {
  const res = await axios.get(url, axiosConfig)
  const $ = cheerio.load(res.data)

  $('.product-title-and-sku').each((i, product) => {
    console.log($(product).find('[unbxdattr="product"]'))
  })

  // console.log($('div.flipper').length)
  // console.log($('.js-product-price').first().children())
  // console.log($('.prod-nb-line-sku').length)
  // console.log($('.card-product-title').first().children().first())
  // $('.card-product-title').each((i, item) =>
  //   console.log(i, $(item.children('a')))
  // )
  // console.log($('.card-product-title', res.data).first().text())
  console.log($('span.price', res.data).length)
  // console.log($('span.price', res.data).first().contents())
  // console.log($('.sign-in-user-widget', res.data).html()) // sign in to order is there

  // console.log($('.js_product_card', res.data).html())
  // $('.js_product_card .pct-heading h3', res.data).each((i, item) => {
  //   console.log($(item).text())
  // })
}

getItemInformation()
