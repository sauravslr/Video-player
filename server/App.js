const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const checkAuth = require('./middlewares/check-auth');

const DB = 'mongodb+srv://sroy:glF7FeYCwCF382hP@cluster0.uxqm1ys.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(DB).then(()=>{
    console.log('connected successfully')
})

mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// To make uploads folder publically available with '/api/videos' route
app.use('/api/videos', express.static('media/uploads'));

//routes
app.use('/api/signUp', require('./router/signUp'))
app.use('/api/signIn', require('./router/signin'))
app.use('/api/upload', checkAuth,  require('./router/upload'))
app.use('/api/videoList', checkAuth, require('./router/videoList'));



module.exports = app
