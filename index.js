const axios = require('axios')
const $ = require('cheerio')

const productsParse = require('./productsParse')
const home = 'https://www.baldorfood.com/'

const axiosConfig = {
  headers: {
    Cookie: "PHPSESSID='ta4tnh5dpvioqdpnlnk3e7h119'",
  },
}

//https://www.baldorfood.com/products/vegetables/tomatoes?viewall=1

const fetchProductClasses = async () => {
  const productClasses = await axios.get(home).then((res) => {
    const products = []
    for (let i = 0; i < 9; i++) {
      products.push($('a.menu-fi-item', res.data)[i].attribs.href)
    }
    return products
  })
  return productClasses
}

const fetchProductSubClasses = async () => {
  fetchProductClasses().then((productClasses) => {
    Promise.all(
      productClasses.map(async (prodClass) => {
        return await axios.get(home + prodClass).then((res) => {
          const subClasses = []
          $('a.subcat-l-title', res.data).each((i, item) => {
            subClasses.push(item.attribs.href)
          })
          return subClasses
        })
      })
    )
      .then((subClasses) => {
        axios.get(home + subClasses[0][0], axiosConfig).then((res) => {
          // console.log($('.product-title-and-sku', res.data)[0])
          // console.log($('.pct-price-unit', res.data)[0])
          // console.log(
          //   'number of product cards',
          //   $('.js_product_card', res.data).length
          // )

          console.log($('.card-product-title', res.data).first().text())
          // console.log($('.pct-heading', res.data).length)
          // console.log($('.price-unit', res.data)[0].children[0].data)

          // console.log($('.pct-price-unit >span', res.data)[0].attribs)
          // #product_ap01 > div > div > div > div.pc-frame > div.clearfix > div > span
          // console.log($('.price-unit', res.data)[0].children[0].data)
          // console.log('names', $('div.user-support', res.data))
        })
      })
      .catch((err) => console.log('ERROR'))
  })
}

fetchProductSubClasses()

const fetchData = async () => {
  const allProducts = []

  await axios
    .get(home)
    // .then((res) => {
    //   const products = []
    //   for (let i = 0; i < 9; i++) {
    //     products.push($('a.menu-fi-item', res.data)[i].attribs.href)
    //   }
    //   return products
    // })
    .then((products) => {
      let promises = products.map((url) => {
        return productsParse(allProducts, home + url)
      })
      Promise.all(promises)
      return allProducts
    })
    .then((s) => {
      console.log('index', s)
    })
    // .then(()=> console.log(allProducts),'all products')
    .catch((err) => console.log('ERROR', err))

  console.log('done', allProducts.length)
}

// fetchData()
