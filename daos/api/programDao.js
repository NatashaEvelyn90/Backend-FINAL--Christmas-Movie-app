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
    }

//     findByGenre: (res, table, genre) => {
//         const sql = `
//             SELECT 
//                 m.movie_id, m.title, m.rating,
//                 m.runtime, m.nationality, m.yr_released,
//                 m.budget, m.gross, m.showing,
//                 m.poster, g.genre
//             FROM movie m
//             JOIN movie_to_genre USING (movie_id)
//             JOIN genre g USING (genre_id)
//             WHERE g.genre = ? OR g.genre_id = ?;`

//         con.execute(sql, [genre, genre], (err, rows)=> {
//             queryAction(res, err, rows, table)
//         })
//     },
};

module.exports = programDao