'use strict'

var mysql = require('mysql')
var myConnection = require ('express-myconnection')
var dbOptions = {
    host : '192.168.64.2',
    port : 3306,
    user : 'conexion',
    password : '123',
    database : 'movies'
}

var Movies = myConnection(mysql,dbOptions, 'request')

module.exports = Movies