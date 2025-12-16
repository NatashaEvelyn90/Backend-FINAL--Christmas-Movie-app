const express = require('express')
const router = express.Router()
const multer = require('multer')
//! mooltur
const path = require('path')

const allow = require('../../helpers/allowedFields')
const {programDao: dao} = require('../../daos/dao')

//! STUFF TO BE ABLE TO UPLOAD IMAGES
// #region
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

// #endregion

//? http://localhost:3713/api/program = all programs but not with everything. Just standard program table
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

//* Special 
//! The single page also uses this 
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

//* http://localhost:3713/api/program/search?field=yr_released&term=1998
router.get('/search', (req, res)=> {
    dao.search(req, res, "program", allow.program)
}) 

//? http://localhost:3713/api/program/:id  = search by program_id. 
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

//! SPICY SECTION
//TODO http://localhost:3713/api/program/create
router.post('/create', upload.single('img_url'), (req, res)=> {

    if(req.file) {
        req.body.img_url = req.file.filename;
    }
    dao.create(req, res, dao.table)
}) 


//TODO http://localhost:3713/api/program/update  
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

//! Don't forget to export! 
module.exports = router