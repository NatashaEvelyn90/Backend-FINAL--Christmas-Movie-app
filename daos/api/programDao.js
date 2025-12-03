const con = require('../../config/dbconfig')
const { queryAction} = require('../../helpers/queryAction')

const programDao = {
    table: 'program', //? Make sure whenever you are creating your daos, this table has to match the table you are looking/working on.

    findAll: (res, table)=> {
        const sql = `
            SELECT 
                p.* 
            FROM program p 
            JOIN program_to_streaming pr ON p.program_id = pr.program_id
            JOIN streaming_platform s ON pr.streaming_platform_id = s.streaming_platform_id
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


// *Notes
//! select * from program join director on program.program_id = director.director_id; = This pulls up the name of directors and just puts them on the table. Not linking up with any of the programs. 
//?  select * from program p Inner join program_to_director d on p.program_id = d.program_id;

// SELECT 
//     p.*
// FROM program p
// LEFT JOIN program_to_director pr ON p.program_id = pr.program_id
// LEFT JOIN director d ON pr.director_id = d.director_id