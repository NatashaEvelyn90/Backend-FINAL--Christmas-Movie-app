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

    findCreditsById: (res, id) => {
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
        GROUP BY p.program_id;`
        
        con.execute(sql, [id], (err, rows)=> {
            if(err) return res.json({error: err})
            if(!rows.length) return res.json({error: "PROGRAM NOT FOUND"})

            const solo = rows[0];
            console.log('DAO SQL RESULT:', solo);
            res.json(solo);
        })           
    }
}

module.exports = programDao

// findCreditsById: (res, table, id) => {
//     const solo = programRows[0];

//     solo.directors = []
//     solo.actors = []
//     solo.streaming = []
//     solo.producer = []

//     //! Producers
//     // #region
//         const producerSql = `
//         SELECT 
//             p.*, pr.producer
//         FROM program p
//         JOIN producer pr 
//             ON p.producer_id = pr.producer_id
//         WHERE p.program_id = ${id};`

//         con.execute(producerSql, [id], (error, cRows) => {
//             if (!error) {
//                 solo.producer = cRows[0].producer;
//             } else {
//                 solo.producer = "UNKNOWN";
//             }
//         });

//     // #endregion 

//     //! Directors 
//     // #region
//         const directorSql = `
//         SELECT 
//             GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ' ,d.last_name) SEPARATOR ', ') 
//             AS director
//         FROM program_to_director ptd
//         JOIN director d 
//             ON d.director_id = ptd.director_id
//         WHERE ptd.program_id = ${id};`

//         con.execute(directorSql, [id], (error, dRows) => {
//             if (!error) {
//                 dRows.forEach(r => solo.directors.push(r.director))
//             }
//         });   

//     // #endregion
    
//     //! Actors
//     // #region
//         const actorSql = `
//         SELECT
//             GROUP_CONCAT(DISTINCT CONCAT(a.first_name, ' ' ,a.last_name) SEPARATOR ', ') 
//             AS actor 
//         FROM program_to_actor pta
//         JOIN actor a 
//             ON a.actor_id = pta.actor_id
//         WHERE pta.program_id = ${id};`

//         con.execute(actorSql, [id], (error, aRows) => {
//             if (!error) {
//                 aRows.forEach(r => solo.actors.push(r.actor))
//             }
//         });

//     // #endregion
    
//     //! Streaming Platforms
//     // #region
//         const streamSql = `
//         SELECT 
//             GROUP_CONCAT(DISTINCT s.streaming_platform SEPARATOR ', ') 
//             AS streaming
//         FROM program_to_streaming pts
//         JOIN streaming_platform s 
//             ON s.streaming_platform_id = pts.streaming_platform_id
//         WHERE pts.program_id = ${id};`
    
//         con.execute(streamSql, [id],(error, sRows) => {
//             if (!error) {
//                 sRows.forEach(r => solo.streaming.push(r.streaming_platform))
//             }
//         }); 
    
//     // #endregion

//         res.json(solo);   
//     }
