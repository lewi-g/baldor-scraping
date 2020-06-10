const getItemInfo = require('./getItemInfo')

const calcUnitPrice = (fullPrice, qty) => {
  const unit = qty.slice(-2)
  const quantity = qty.slice(0, qty.length - 2)
  const error = `can not handle qty "${qty}"`

  let unitPrice

  function calcPrice(num) {
    return (fullPrice / num).toFixed(2)
  }

  // check if we have numbers in qty
  if (quantity.trim().length > 0) {
    unitPrice = calcPrice(quantity)
  } else {
    console.log(error)
    return error
  }

  // if unitPrice is not a number
  if (isNaN(unitPrice)) {
    // check for / or -  in qty
    if (quantity.indexOf('-') > 0) {
      const [lowerLimit, upperLimit] = quantity.split('-')
      return `${calcPrice(lowerLimit)} to ${calcPrice(upperLimit)} per ${unit}`
    } else if (quantity.indexOf('/') > 0) {
      const [lowerLimit, upperLimit] = quantity.split('/')
      return `${calcPrice(lowerLimit)} to ${calcPrice(upperLimit)} per ${unit}`
    } else if (quantity.indexOf('X') > 0) {
      console.log(quantity.indexOf('X'))
      const updatedQty = quantity.split('X').reduce((a, b) => a * b, 1)
      console.log(updatedQty)

      return `${calcPrice(updatedQty)} per ${unit}`
    } else {
      console.error(error)
      unitPrice = error
    }
  }

  return unitPrice + ' per ' + unit
}

// console.log(calculateUnitPrice('69.99', '100 CT')) // expect 0.70 per CT
// console.log(calculateUnitPrice('89.99', '80-88 CT')) // expect 1.12 to 1.02 per CT
// console.log(calculateUnitPrice('64.99', ' LB')) // expect can not handle qty  LB

module.exports = calcUnitPrice
