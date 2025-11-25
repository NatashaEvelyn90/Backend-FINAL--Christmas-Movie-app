const router = require('express').Router()
const {directorDao: dao} = require('../../daos/dao')

//? http://localhost:3713/api/director = shows a full list of all the directors
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//? http://localhost:3713/api/director/programs/:id = put movies/the id of a director and it pulls up the movie they worked on
router.get('/programs/:id', (req, res)=> {
    dao.findDirectorMovies(res, dao.table, req.params.id)
})

//? http://localhost:3713/api/director/sort = can sort by first_name or last_name (as that is all we have on our table)
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:3713/api/director/:id  = search by their director_id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

//! http://localhost:3713/api/director/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

//! http://localhost:3713/api/director/update 
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router 