const router = require('express').Router()
// const { findProducerByYear } = require('../../daos/api/companyDao')
const {companyDao: dao} = require('../../daos/dao')

//? http://localhost:3713/api/company = show full list of companies
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//* special 
//? http://localhost:3713/api/company/programs/:producer = search producers by using the id#
router.get('/programs/:producer', (req, res)=> {
    dao.findProgramsByProducer(res, dao.table, req.params.producer)
})

// *special
//? http://localhost:3713/api/company/year/1998 = find title created by producer by the year (Type in 1998)
router.get('/year/:year', (req, res)=> {
    dao.findProducerByYear(res, dao.table, req.params.year)
})

//? http://localhost:3713/api/company/sort/ = sort by producer or producer_id it will be in alphabetical order by producer
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:3713/api/company/count checking count of how many rows you have or entries
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table, req.params.count)
})

//? http://localhost:3713/api/company/:id  = sort by id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})


//! SPICY SECTION
//TODO http://localhost:3713/api/company/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

//TODO http://localhost:3713/api/company/update 
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router 