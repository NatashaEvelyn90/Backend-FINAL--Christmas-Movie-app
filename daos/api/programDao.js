const con = require('../../config/dbconfig')
const { queryAction} = require('../../helpers/queryAction')

const programDao = {
    table: 'program', //? Make sure whenever you are creating your daos, this table has to match the table you are looking/working on.

    completeLog: (res, table, id)=> {
        const sql = `
        SELECT 
            p.*, pr.producer,
            GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ' ,d.last_name) SEPARATOR ', ') AS director, 
            GROUP_CONCAT(DISTINCT CONCAT(a.first_name, ' ' ,a.last_name) SEPARATOR ', ') AS actor,
            GROUP_CONCAT(DISTINCT s.streaming_platform SEPARATOR ', ') AS streaming
        FROM program p 
        LEFT JOIN producer pr ON p.producer_id = pr.producer_id

        LEFT JOIN program_to_director ptd ON p.program_id = ptd.program_id 
        LEFT JOIN director d ON ptd.director_id = d.director_id 

        LEFT JOIN program_to_actor pta ON p.program_id = pta.program_id
        LEFT JOIN actor a ON pta.actor_id = a.actor_id

        LEFT JOIN program_to_streaming pts ON p.program_id = pts.program_id
        LEFT JOIN streaming_platform s ON pts.streaming_platform_id = s.streaming_platform_id
        WHERE p.program_id = ?
        GROUP BY p.program_id;`;
        
        con.execute(sql, [id], (err, rows)=> {
            queryAction(res, err, rows, table)
        })    
    },

    findByRating: (res, table, rating)=> {
        const sql = `
        SELECT * FROM ${table} 
        WHERE age_restrict = ?;`;

        con.execute(sql, [rating], (err, rows) => {
            queryAction(res, err, rows, table)
        })
    },

    

}

module.exports = programDao
