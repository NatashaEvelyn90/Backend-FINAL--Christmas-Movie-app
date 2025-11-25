const router = require('express').Router()
const {streamDao: dao} = require('../../daos/dao')

//? http://localhost:3713/api/stream = show full list of streaming platforms
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//? http://localhost:3713/api/stream/stream/:id = search movies by typing in the id
router.get('/stream/:id', (req, res)=> {
    dao.findMoviesByStreamer(res, dao.table, req.params.id)
})

//? http://localhost:3713/api/stream/sort/streaming_platform = sort by streaming_platform (abc order) or streaming_platform_id 
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:3713/api/stream/:id  = sort by id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router 