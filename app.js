'use strict'

// Configuración de la aplicación

var express = require('express')
var favicon = require('serve-favicon')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var routes = require('./routes/index.js')
var jade = require('jade')

var faviconURL = __dirname + '/public/img/node-favicon.png'
var publicDir = express.static(`${__dirname}/public`)
var viewDir = `${__dirname}/views`
var port = (process.env.PORT || 3000)
var app = express()

// Configuración de la aplicación
app.set('views',viewDir)
app.set('view engine','jade')
app.set('port', port)

// Ejecutando Middleware
app.use(favicon(faviconURL))
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({extended: false}) )
app.use( morgan('dev') )
app.use(publicDir)

//Ejecutando el Middleware donde esta la logica de las rutas
.use(routes)

module.exports = app

