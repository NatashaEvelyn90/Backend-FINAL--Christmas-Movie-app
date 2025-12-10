const con = require('../../config/dbconfig')
const {queryAction} = require('../../helpers/queryAction')

const producerDao = {
    table: 'producer', 

    findProgramsByProducer: (res, table, producer) => {
        const sql = `
            SELECT p.*, pr.producer
            FROM program p
            JOIN producer pr ON p.producer_id = pr.producer_id
            WHERE pr.producer_id = ?;`

        con.execute(sql, [producer], (err, rows) => {
            queryAction(res, err, rows, 'program')
        })
    },

    findProducerByYear: (res, table, year) => {
        const sql = `
            SELECT p.title, p.yr_released, pr.producer
            FROM program p
            JOIN producer pr ON p.producer_id = pr.producer_id
            WHERE yr_released = ?;`;

        con.execute(sql, [year], (err, rows)=> {
            queryAction(res, err, rows)
        })    
    }
}

module.exports = producerDao