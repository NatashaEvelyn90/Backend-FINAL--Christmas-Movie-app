const express = require('express')
const router = express.Router()

const {programDao: dao} = require('../../daos/dao')

//? http://localhost:3713/api/program = lists all the programs
router.get('/', (req, res)=> {
    dao.findEverythang(res, dao.table) 
})

//? http://localhost:3713/api/program/age/ = choose between "R", "PG-13" etc. 
router.get('/age/:restrict', (req, res)=> {
    dao.findByRating(res, dao.table, req.params.restrict)
})

//? http://localhost:3713/api/program/sort/ =  sort by title, runtime, yr_released etc
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})


//? http://localhost:3713/api/program/:id  = search by program_id. 
//! Id needs to be at the bottom instead because if sort is at the bottom, it would try to sort by id and we don't want that. Also instead of listing the word ID you would choose a number
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

//! http://localhost:3713/api/program/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
}) 

//! http://localhost:3713/api/program/update  
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

//! Don't forget to export! 
module.exports = router