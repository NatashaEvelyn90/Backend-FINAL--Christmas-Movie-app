const con = require('../../config/dbconfig')
const { queryAction} = require('../../helpers/queryAction')

const programDao = {
    table: 'program', //? Make sure whenever you are creating your daos, this table has to match the table you are looking/working on.

    findAll: (res, table)=> {
        const sql = `
            SELECT 
                p.*  
            FROM program p 
            LEFT JOIN program_to_streaming ps ON p.program_id = ps.program_id
            LEFT JOIN streaming_platform s ON ps.streaming_platform_id = s.streaming_platform_id
            GROUP BY p.program_id
            ORDER BY p.program_id;`;
            
        con.execute(sql, (err, rows)=> {
            queryAction(res, err, rows, table)
        })    
    },

    findByRating: (res, table)=> {
        const sql = `
        SELECT * FROM program WHERE age_restrict = '?'`
    }

};

module.exports = programDao