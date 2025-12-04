const con = require('../../config/dbconfig')
const {queryAction} = require('../../helpers/queryAction')

const companyDao = {
    table: 'producer', //* table is called production but I went with Company for everything

    findProgramsByProducer: (res, table, producer) => {
        const sql = `
            SELECT p.*, pr.producer
            FROM program p
            JOIN producer pr ON p.producer_id = pr.producer_id
            WHERE pr.producer_id = ?;`

        con.execute(sql, [producer], (err, rows) => {
            queryAction(res, err, rows, 'program')
        })
    }
}

module.exports = companyDao