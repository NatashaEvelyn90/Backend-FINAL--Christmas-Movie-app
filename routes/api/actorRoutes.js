const router = require('express').Router()
const allow = require('../../helpers/allowedFields')
const {actorDao: dao} = require('../../daos/dao')


//? http://localhost:3713/api/actor = Full list of Actors
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//* Special 
//? http://localhost:3713/api/actor/programs/:id = put programs/id# of the actor and then it should show what movie/program they were in (EX: 12)
router.get('/programs/:id', (req, res)=> {
    dao.findActorPrograms(res, dao.table, req.params.id)
})

//* Special 
//? http://localhost:3713/api/actor/age/ = find an actor by the rating system. (EX: G)
router.get('/age/:rating', (req, res)=> {
    dao.findActorByProgramRating(res, dao.table, req.params.rating)
})

//? http://localhost:3713/api/actor/sort/ = sort by actor_id, first_name, or last_name. If error, 404 error will apppear!
router.get('/sort/:sorter', (req, res, next)=> {
    dao.sort(res, dao.table, req.params.sorter, next)
})

//? http://localhost:3713/api/actor/count = checking count of how many rows(actors) you have
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table, req.params.count)
})

//* http://localhost:3713/api/actor/search?field=actor_id&term=17 = search for the actor by their field/actor_id and their id#
router.get('/search', (req, res)=> {
    dao.search(req, res, "actor", allow.actor)
})

//? http://localhost:3713/api/actor/:id = search by their actor_id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

//! SPICY SECTION 
//TODO http://localhost:3713/api/actor/create = adding new actors
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
}) 

//TODO http://localhost:3713/api/actor/update = fixing if you have a typo
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router 