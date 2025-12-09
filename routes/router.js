const express = require('express')
const router = express.Router()
const axios = require('axios')
const PORT = process.env.PORT || 3713
 

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
    'Actor', 'Program'
]

//? http://localhost:3713/forms - Form pages for Actor and Program
forms.forEach(forms => {
    router.get(`/${forms}Form`, (req, res)=> {
        res.render(`pages/forms/${forms}-form`, {
            title: `${forms} Form`,
            name: `${forms} Form`
        })
    })
})


//? ALL Programs
router.get('/allPrograms', (req, res)=> {
    const url = 'http://localhost:3713/api/program'
    
    axios.get(url)
    .then(resp => {
        res.render('pages/allPrograms', {
            title: 'All Programs',
            name: 'Featured Programs',
            program: resp.data
        })
    })
}) 

// #endregion



//! API section
// #region
//? http://localhost:3713/api
router.get('/api', (req, res)=> {

    res.json({
        'All Programs': `http://localhost:${PORT}/api/program`,
        'All Actors': `http://localhost:${PORT}/api/actor`,
        'All Directors': `http://localhost:${PORT}/api/director`,
        'All Production Companies': `http://localhost:${PORT}/api/company`,
        'All Streaming Platforms': `http://localhost:${PORT}/api/stream`
    })
}) 

const endpoints = [
    'program', 
    'actor', 
    'director', 
    'company', 
    'stream'
]

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})

// #endregion


//? Single Program
// Render the singleProgram page
router.get('/program/:id', (req, res) => {
    const id = req.params.id;
    axios.get(`http://localhost:3713/api/program/${id}`)
        .then(resp => {
            const solo = resp.data;
            console.log('API response:', solo); // should now include producer, directors, actors, streaming
            res.render('pages/singleProgram', {
                title: solo.title || 'Program',
                name: 'Featured Presentation',
                solo
            });
        })
        .catch(err => console.log(err));
});



// router.get('/program/:id', (req, res)=> {
//     const id = req.params.id
//     const url = `http://localhost:3713/api/program/${id}`

//     axios.get(url)
//     .then(resp => {
//         const solo = resp.data
//         console.log('API response:', solo)
//         res.render('pages/singleProgram', {
//             title: solo.title,
//             name: 'Featured Presentation', 
//             solo
//         })
//     })
// }) 



//! error page  
router.use((req, res, next)=> {
    res.status(404)
    .render('pages/errorPage', {
        title: 'ERROR PAGE',
        name: 'Error'
    })
})

module.exports = router