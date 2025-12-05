const con = require('../../config/dbconfig')
const { queryAction} = require('../../helpers/queryAction')

const directorDao = {
    table: 'director',
    
    findDirectorPrograms:(res, table, id)=> {
        const sql = `
            SELECT p.*, d.first_name, d.last_name
            FROM program p
            JOIN program_to_director USING (program_id)
            JOIN director d USING (director_id)
            WHERE d.director_id = ?;`;

        con.execute(sql, [id], (err, rows) => {
            queryAction(res, err, rows, table)
        })
    },

    proudDirectorMoment:(res, table, rating)=> {
        const sql = `
            SELECT d.first_name, d.last_name, p.title, p.runtime, p.rating, p.description
            FROM program p
            JOIN program_to_director USING (program_id)
            JOIN director d USING (director_id)
            WHERE d.director_id = ?;`;

        con.execute(sql, [rating], (err, rows)=> {
            queryAction(res, err, rows, table)
        })    
    }
}

module.exports = directorDao