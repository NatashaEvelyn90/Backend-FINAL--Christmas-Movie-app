const con = require('../../config/dbconfig')
const { queryAction} = require('../../helpers/queryAction')

const streamDao = {
    table: 'streaming_platform', //? Make sure whenever you are creating your daos, this table has to match the table you are looking/working on.

    findMoviesByStreamer: (res, table, stream) => {
        const sql = `
            SELECT p.*, s.streaming_platform
            FROM program p
            JOIN program_to_streaming ps ON p.program_id = ps.program_id
            JOIN streaming_platform s ON ps.streaming_platform_id =s.streaming_platform_id
            WHERE s.streaming_platform_id = ?;`

        con.execute(sql, [stream], (err, rows) => {
            queryAction(res, err, rows, 'movie')
        })
    }
};

module.exports = streamDao