const con = require('../../config/dbconfig')
const {queryAction} = require('../../helpers/queryAction')

const companyDao = {
    table: 'producer', //* table is called production but I went with Company for everything

    findMoviesByProduction: (res, table, producer) => {
        const sql = `
            SELECT p.*, c.producer
            FROM program p
            JOIN producer c ON p.producer_id = c.producer_id
            WHERE c.producer_id = ?;`

        con.execute(sql, [producer], (err, rows) => {
            queryAction(res, err, rows, 'movie')
        })
    }
}

module.exports = companyDao