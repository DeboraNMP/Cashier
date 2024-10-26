const express = require('express')
const routes = express()

const categories = require('./controllers/categories')
const usersRegistration = require('./controllers/usersRegistration')
const login = require('./controllers/login')
const authentication = require('./authentication')
const userProfile = require('./controllers/userProfile')
const editUser = require('./controllers/editUser')

const products = require('./controllers/productsRegistration')
const editProduct = require('./controllers/editProduct')
const listProducts = require('./listProducts')
const detailProduct = require('./detailProduct')
const deleteProduct = require('./deleteProduct')
const clientRegistration = require('./clientRegistration')
const clients = require('./controllers/listClient')
const editClient = require('./editClient')
const detailClient = require('./controllers/detailClient')
const orderRegistration = require('./orders/orderRegistration')

routes.get('/category', categories)
routes.post('/users', usersRegistration)
routes.post('/login', login)
routes.use(authentication)
routes.get('/user', userProfile)
routes.put('/user', editUser)

routes.post('/product', products)
routes.post('/product/:id', editProduct)
routes.get('/product', listProducts)
routes.get('/product/:id', detailProduct)
routes.delete('/product/:id', deleteProduct)
routes.post('/client', clientRegistration)
routes.get('/client', clients)
routes.put('/client/:id', editClient)
routes.get('/client/:id', detailClient)
routes.post('/order', orderRegistration)



module.exports = routes