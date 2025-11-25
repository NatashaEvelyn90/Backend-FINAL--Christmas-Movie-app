const con = require('../../config/dbconfig')
const { queryAction} = require('../../helpers/queryAction')

const actorDao = {
    table: 'actor',

    findActorMovies:(res, table, id)=> {
        const sql = `
            SELECT p.*, a.first_name, a.last_name
            FROM program p
            JOIN program_to_actor USING (program_id)
            JOIN actor a USING (actor_id)
            WHERE a.actor_id = ?;`;

        con.execute(sql, [id], (err, rows) => {
            queryAction(res, err, rows, table)
        });
    }
}

module.exports = actorDao