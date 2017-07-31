import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import repository from './repository'

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.dev'

const port = process.env.PORT || 3300
let app = express()

// express middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let ttnRouter = express.Router()
ttnRouter.route('/ttn-message').post(function(req, res) {
  console.log('=> /ttn-message')
  repository.addTtnMessage(req.body).then(function(data) {
    res.json({ message: 'OK' })
  }).catch(err => {
    console.error(err)
    res.sendStatus("500")
  })
})

ttnRouter.route('/gps-trakers').get(function(req, res) {
  repository.getGpsTrakers().then(function(data) {
    res.json(data)
  }).catch(err => {
    console.error(err)
    res.sendStatus("500")
  })
})

ttnRouter.route('/gateways').get(function(req, res) {
  repository.getTtnGateways().then(function(data) {
    res.json(data)
  }).catch(err => {
    console.error(err)
    res.sendStatus("500")
  })
})

ttnRouter.route('/gps-logs').get(function(req, res) {
  repository.getGpsLogs().then(function(data) {
    res.json(data)
  }).catch(err => {
    console.error(err)
    res.sendStatus("500")
  })
})


ttnRouter.route('/gps-logs-map-data').get(function(req, res) {
  repository.getGpsLogsMapData().then(function(data) {
    res.json(data)
  }).catch(err => {
    console.error(err)
    res.sendStatus("500")
  })
})

app.use('/api', ttnRouter);

const compiler = webpack(webpackConfig)
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: false
}))
app.use(webpackHotMiddleware(compiler))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(port, () => {
  console.log('Running on localhost:' + port)
})