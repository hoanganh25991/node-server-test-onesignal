const bodyParser = require("body-parser")

const bindCommonMiddleware = app => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app
    .use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*")
      res.header("Access-Control-Allow-Headers", "X-Requested-With")
      next()
    })
    .options("*", function(req, res, next) {
      res.end()
    })
}

module.exports = {
  bindCommonMiddleware
}
