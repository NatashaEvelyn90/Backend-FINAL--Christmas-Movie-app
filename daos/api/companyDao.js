const con = require('../../config/dbconfig')
const {queryAction} = require('../../helpers/queryAction')

const companyDao = {
    table: 'production', //* table is called production but I went with Company for everything

    findMoviesByProduction: (res, table, production) => {
        const sql = `
            SELECT p.*, c.production
            FROM program p
            JOIN production c ON p.production_id = c.production_id
            WHERE c.production_id = ?;`

        con.execute(sql, [production], (err, rows) => {
            queryAction(res, err, rows, 'movie')
        })
    }
}

module.exports = companyDao