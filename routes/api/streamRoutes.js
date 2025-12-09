const router = require('express').Router()
const allow = require('../../helpers/allowedFields')
const {streamDao: dao} = require('../../daos/dao')

//? http://localhost:3713/api/stream = show full list of streaming platforms
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//* Special 
//? http://localhost:3713/api/stream/stream/:id = search programs by typing in the id
router.get('/stream/:id', (req, res)=> {
    dao.findProgramsByStreamer(res, dao.table, req.params.id)
})

//* Special 
//? http://localhost:3713/api/stream/favorite/4 
router.get('/favorite/:format', (req, res)=> {
    dao.streamsFavFormat(res, dao.table, req.params.format)
})

//? http://localhost:3713/api/stream/sort/streaming_platform = sort by streaming_platform (abc order) or streaming_platform_id 
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:3713/api/stream/count = checking count of how many rows you have or entries
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table, req.params.count)
})

//? http://localhost:3713/api/stream/search?field=streaming_platform_id&term=7
router.get('/search', (req, res)=> {
    dao.search(req, res, "streaming_platform", allow.streaming)
})

//? http://localhost:3713/api/stream/:id  = sort by id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router 