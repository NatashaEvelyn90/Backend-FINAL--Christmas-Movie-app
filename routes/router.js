const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3713

//! To add your stylesheet
router.use(express.static ('public')) 

//*Homepage section
// #region 
//? http://localhost:3713 - This is the homepage
router.get('/', (req, res)=> {
    res.render('pages/homePage', {
        title: 'Christmas Movie App',
        name: "Crazpicc's Christmas Collection!"
    })
}) 

const forms = [
    'Actor', 'Production'
]

//? http://localhost:3713/forms - Form pages
forms.forEach(forms => {
    router.get(`/${forms}Form`, (req, res)=> {
        res.render(`pages/form/${forms}Form`, {
            title: `${forms} Form`,
            name: `${forms} Form`
        })
    })
})

// #endregion

//! API section

//? http://localhost:3713/api
router.get('/api', (req, res)=> {

    res.json({
        'All Programs': `http://localhost:${PORT}/api/program`,
        // 'All Actors': `http://localhost:${PORT}/api/actor`,
        // 'All Directors': `http://localhost${PORT}/api/director`,
        // 'All Production Companies': `http://localhost${PORT}/api/company`,
        // 'All Streaming Platforms': `http://localhost${PORT}/api/stream`
    })
}) 

const endpoints = [
    'program' 
    // 'actor', 
    // 'director', 
    // 'company', 
    // 'stream'
]

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})


module.exports = router