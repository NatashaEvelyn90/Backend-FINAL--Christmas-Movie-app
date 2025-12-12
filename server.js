const express = require('express')
const server = express()
const path = require('path')

const router = require('./routes/router')
const PORT = process.env.PORT || 3713

const helmet = require('helmet')
const cors = require('cors')

//! To add your stylesheet
server.use(express.static(path.join(__dirname,'public')));
server.use('/media', express.static(path.join(__dirname,'public/media')));
server.use('/uploads', express.static(path.join(__dirname,'public/uploads')));

//! security  
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    CrossOriginEmbedderPolicy: false,
    directives: {
        "img-src": ["'self'", "https: data"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]
    }
}))

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true}))

//? For us to be able to "View" pages 
server.set('view engine', 'ejs')

server.use('/', router)


server.listen(PORT, ()=> console.log(`OUR FINAL IS UPON US. This is the final project.`))