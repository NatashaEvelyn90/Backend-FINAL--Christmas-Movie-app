const express = require('express')
const router = express.Router()

const {programDao: dao} = require('../../daos/dao')

//? http://localhost:3713/api/program = all programs but not with everything. Just standard program table
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

//* Special 
//? http://localhost:3713/api/program/complete/ = Complete collection information
router.get('/complete/:id', (req, res)=> {
    dao.completeLog(res, dao.table, req.params.id) 
})

//* Special 
//? http://localhost:3713/api/program/age/ = choose between "R", "PG-13" etc. 
router.get('/age/:restrict', (req, res)=> {
    dao.findByRating(res, dao.table, req.params.restrict)
})

//? http://localhost:3713/api/program/sort/ =  sort by title, runtime, yr_released etc
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:3713/api/program/count checking count of how many rows you have or entries
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table, req.params.count)
})

//? http://localhost:3713/api/program/search?field=yr_released&term=1998
router.get('/program/search', (req, res)=> {
    daoCommon.search(req, res, "program", programFields)
}) 

//? http://localhost:3713/api/program/:id  = search by program_id. 
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

//! SPICY SECTION
//TODO http://localhost:3713/api/program/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
}) 

//TODO http://localhost:3713/api/program/update  
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

//! Don't forget to export! 
module.exports = router