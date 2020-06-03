const axiosConfig = {
  headers: {
    Cookie: `SESSION = ${process.env.SESSION}`,
  },
}

module.exports = axiosConfig
