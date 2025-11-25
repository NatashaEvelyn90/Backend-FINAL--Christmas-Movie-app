const router = require('express').Router()
const {companyDao: dao} = require('../../daos/dao')

//? http://localhost:3713/api/company = show full list of companies
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//? http://localhost:3713/api/company/programs/:production = search productions by using the id
router.get('/programs/:production', (req, res)=> {
    dao.findMoviesByProduction(res, dao.table, req.params.production)
})

//? http://localhost:3713/api/company/sort = sort by production or production_id it will be in alphabetical order by production
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:3713/api/company/:id  = sort by id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

//! http://localhost:3713/api/company/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

//! http://localhost:3713/api/company/update 
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router 