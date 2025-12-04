const con = require('../../config/dbconfig')
const { queryAction} = require('../../helpers/queryAction')

const programDao = {
    table: 'program', //? Make sure whenever you are creating your daos, this table has to match the table you are looking/working on.

    findEverythang: (res, table)=> {
        const sql = `
        SELECT 
            p.*, pr.producer,
            GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ' ,d.last_name) SEPARATOR '. ') AS director, 
            GROUP_CONCAT(DISTINCT CONCAT(a.first_name, ' ' ,a.last_name) SEPARATOR '. ') AS actor,
            GROUP_CONCAT(DISTINCT s.streaming_platform SEPARATOR ', ') AS streaming
        FROM program p 
        LEFT JOIN producer pr ON p.producer_id = pr.producer_id

        LEFT JOIN program_to_director ptd ON p.program_id = ptd.program_id 
        LEFT JOIN director d ON ptd.director_id = d.director_id 

        LEFT JOIN program_to_actor pta ON p.program_id = pta.program_id
        LEFT JOIN actor a ON pta.actor_id = a.actor_id

        LEFT JOIN program_to_streaming pts ON p.program_id = pts.program_id
        LEFT JOIN streaming_platform s ON pts.streaming_platform_id = s.streaming_platform_id
        GROUP BY p.program_id
        ORDER BY p.program_id;`;
        
        con.execute(sql, (err, rows)=> {
            queryAction(res, err, rows, table)
        })    
    },

    findByRating: (res, table, rating)=> {
        const sql = `
        SELECT * FROM ${table} 
        WHERE age_restrict = ?`;

        con.execute(sql, [rating], (err, rows) => {
            queryAction(res, err, rows, table)
        })
    }

}

module.exports = programDao


// *Notes
//! select * from program join director on program.program_id = director.director_id; = This pulls up the name of directors and just puts them on the table. Not linking up with any of the programs. 
//?  select * from program p Inner join program_to_director d on p.program_id = d.program_id;

// SELECT 
//     p.*
// FROM program p
// LEFT JOIN program_to_director pr ON p.program_id = pr.program_id
// LEFT JOIN director d ON pr.director_id = d.director_id