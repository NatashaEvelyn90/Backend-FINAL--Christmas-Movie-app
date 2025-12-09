const router = require('express').Router()
const allow = require('../../helpers/allowedFields')
const {directorDao: dao} = require('../../daos/dao')

//? http://localhost:3713/api/director = shows a full list of all the directors
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//* Special
//? http://localhost:3713/api/director/programs/:id = put movies/the id of a director and it pulls up the movie they worked on
router.get('/programs/:id', (req, res)=> {
    dao.findDirectorPrograms(res, dao.table, req.params.id)
})

//* Special 
//? http://localhost:3713/api/director/proud/5 = show the director's greatest creation by using their id#
router.get('/proud/:rating', (req, res)=> {
    dao.proudDirectorMoment(res, dao.table, req.params.rating) 
})

//? http://localhost:3713/api/director/sort = can sort by first_name or last_name (as that is all we have on our table)
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:3713/api/director/count checking count of how many rows you have or entries
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table, req.params.count)
})

//? http://localhost:3713/api/director/search?field=director_id&term=3
router.get('/search', (req, res)=> {
    dao.search(req, res, "director", allow.director)
})

//? http://localhost:3713/api/director/:id  = search by their director_id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

//! SPICY SECTION 
//TODO http://localhost:3713/api/director/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

//TODO http://localhost:3713/api/director/update 
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router 