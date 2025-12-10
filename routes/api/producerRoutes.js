const router = require('express').Router()
const allow = require('../../helpers/allowedFields')
const {producerDao: dao} = require('../../daos/dao')

//? http://localhost:3713/api/producer = show full list of producers
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//* special 
//? http://localhost:3713/api/producer/programs/:producer = search producers by using the id#
router.get('/programs/:producer', (req, res)=> {
    dao.findProgramsByProducer(res, dao.table, req.params.producer)
})

// *special
//? http://localhost:3713/api/producer/year/1998 = find title created by producer by the year (Type in 1998)
router.get('/year/:year', (req, res)=> {
    dao.findProducerByYear(res, dao.table, req.params.year)
})

//? http://localhost:3713/api/producer/sort/ = sort by producer or producer_id it will be in alphabetical order by producer
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:3713/api/producer/search?field=producer_id&term=10
router.get('/search', (req, res)=> {
    // console.log("producer search triggered")
    // res.send("P:roducer search route works")
    dao.search(req, res, "producer", allow.producer)
})

//? http://localhost:3713/api/producer/count checking count of how many rows you have or entries
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table, req.params.count)
})

//? http://localhost:3713/api/producer/:id  = sort by id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})


//! SPICY SECTION
//TODO http://localhost:3713/api/producer/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

//TODO http://localhost:3713/api/producer/update 
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router 