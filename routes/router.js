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
        'All Producer Companies': `http://localhost:${PORT}/api/producer`,
        'All Streaming Platforms': `http://localhost:${PORT}/api/stream`
    })
}) 

const endpoints = [
    'program', 
    'actor', 
    'director', 
    'producer', 
    'stream'
]

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})

// #endregion

//? Single Program
// #region
router.get('/program/:id', (req, res) => {
    const id = req.params.id;

    //! using the complete api route from programRoutes 
    axios.get(`http://localhost:3713/api/program/complete/${id}`)
        .then(resp => {
            const solo = resp.data; 
            if (!solo) {
                return res.status(404).render('pages/errorPage', {
                    title: 'Not Found',
                    name: 'Page Not Found'
                });
            }
            res.render('pages/singleProgram', {
                title: solo.title,
                name: 'Featured Program',
                solo: solo
            });
        })
        .catch(err => {
            // console.error("Axios error:", err.message);
            res.status(500).render('pages/errorPage', {
                title: 'Error',
                name: 'Error fetching program data'
            });
        });
});

// #endregion

//! error page  
router.use((req, res, next)=> {
    res.status(404)
    .render('pages/errorPage', {
        title: 'ERROR PAGE',
        name: 'Error'
    })
})

module.exports = router

