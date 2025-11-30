const connect = require('../../config/dbconfig')
const{ queryAction} = require('../../helpers/queryAction')

const daoCommon = {

    //? FIND ALL
    findAll: (res, table)=> {
        connect.execute(
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    //? FIND BY ID 
    findById: (res, table, id)=> {
        connect.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    //? SORT
    sort: (res, table, sorter)=> {
        connect.query(
            `SELECT * FROM ${table} ORDER BY ${sorter};`,
            (error, rows)=>{
                queryAction(res, error, rows, table)
            }
        )
    },  

    //? COUNT ALL 
    //* This shows you the total count of how many rows are in your table. For example, if you do for your actor table, it pulls up 114 rows. 
    countAll: (res, table)=> {
        con.execute(
            `SELECT COUNT(*) AS COUNT FROM ${table};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    //! Danger zone section
    // #region 
    //! CREATE Method (POST)
    create: (req, res, table) => {
        if(Object.keys(req.body).length === 0) { //* Object must be capitalized
            res.json({
                "error": true,
                "message": "No fields to create"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)
            //* exectute can take 3 arguments, query can only take 2 arguments
            connect.execute(
                `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ? ;`,
                values,
                (error, dbres)=> {
                    if(!error){
                        console.log(dbres)
                        res.render('pages/success', {
                            title: 'Thank You.',
                            name: 'Success'
                        })
                    } else {
                        console.log(`${table} Dao error: `, error)
                    }
                }
            )
        }
    },

    //! UPDATE Method (PATCH)
    update: (req, res, table) => {
        if(isNaN(req.params.id)) {
            res.json({
                "error": true,
                "message": "Id must be a number"
            })
        } else if (Object.keys(req.body).length == 0) {
            res.json({
                "error": true,
                "message": "No fields to update"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            connect.execute(
                `UPDATE ${table}
                    SET ${fields.join(' = ?, ')} = ? 
                    WHERE ${table}_id = ?`,
                [...values, req.params.id],
                (error, dbres)=> {
                    if(!error) {
                        res.json({
                            "status": 'updated',
                            "changedRows": dbres.changedRows
                        })
                    } else {
                        res.json({
                            "error": true,
                            "message": error
                        })
                    }
                }    
            )
        }
    }

//     //! DELETE Method (DELETE) 
//     delete: (res, table, id)=> {
//         console.log(`${table}_id: ${id}`)

//         connect.execute(`
//             DELETE from ${table} 
//             WHERE ${table}_id = ${id};
//             SET @num := 0;
//             UPDATE ${table} 
//             SET ${table}_id = @num := (@num +1);
//             ALTER TABLE ${table} AUTO_INCREMENT = 1;`,

//             (error, dbres)=> {
//                 if(!error) {
//                     res.send('Record Deleted')
//                 } else {
//                     res.json({
//                         "error":true,
//                         "message": error
//                     })
//                 }
//             }
//         )
//     }

// #endregion

}

module.exports = daoCommon

// Actors
search: (req, res, table)=> {

        let sql = ''

        const query = req.query ? req.query : {}

        /**
         * Ex.
         * query = { first_name: ro, last_name: di }
         */

        let first_name = query.first_name || null
        let last_name = query.last_name || null

        if (first_name == null && last_name == null) {
            sql = `SELECT * FROM ${table};`
        } else if (last_name == null) {
            sql = `SELECT * FROM ${table} WHERE first_name LIKE '%${first_name}%';`
        } else if (first_name == null) {
            sql = `SELECT * FROM ${table} WHERE last_name LIKE '%${last_name}%';`
        } else {
            sql = `SELECT * FROM ${table} WHERE first_name LIKE '%${first_name}%' AND last_name LIKE '%${last_name}%';`
        }

        con.execute(
            sql, 
            (error, rows)=> {
                if (rows.length == 0) {
                    res.send('<h1>No data to send</h1>')
                } else {
                    queryAction(res, error, rows, table)
                }
            }
        )
    }
}

// Directors
search: (req, res, table)=> {

        let sql = ''

        const query = req.query ? req.query : {}

        let first_name = req.query.first_name || null
        let last_name = req.query.last_name || null

        if (first_name == null && last_name == null) {
            sql = `SELECT * FROM ${table};`
        } else if (last_name == null) {
            sql = `SELECT * FROM ${table} WHERE first_name LIKE '%${first_name}%';`
        } else if (first_name == null) {
            sql = `SELECT * FROM ${table} WHERE last_name LIKE '%${last_name}%';`
        } else {
            sql = `SELECT * FROM ${table} WHERE first_name LIKE '%${first_name}%' AND last_name LIKE '%${last_name}%';`
        }

        con.execute(
            sql, 
            (error, rows)=> {
                if (rows.length == 0) {
                    res.send('<h1>No data to send</h1>')
                } else {
                    queryAction(res, error, rows, table)
                }
            }
        )
    }

    // movie
    search: (req, res, table)=> {

        let sql = ''
        const query = req.query ? req.query : {}
        
        let genre = query.genre || null // comedy, drama, sci-fi, null
        let rating = query.rating || null

        if (genre == null && rating == null) {
            sql = `SELECT * FROM ${table};`
        } else if (rating == null) {
            sql = `SELECT m.*, g.genre_id, g.genre 
                FROM movie m 
                JOIN movie_to_genre USING (movie_id) 
                JOIN genre g USING (genre_id) 
                WHERE g.genre = '${genre}';`
        } else if (genre == null ) {
            sql = `SELECT * FROM movie WHERE rating = '${rating}';`
        } else {
            sql = `SELECT m.movie_id, m.title, m.rating, m.runtime, m.nationality, m.yr_released, m.budget, m.gross, m.production_id, m.showing, m.poster, g.genre_id, g.genre 
                FROM movie m 
                JOIN movie_to_genre USING (movie_id) 
                JOIN genre g USING (genre_id) 
                WHERE g.genre = '${genre}' AND m.rating = '${rating}';`
        }

        con.execute(
            sql,
            (error, rows)=> {
                rows.length == 0 ? res.send('<h1>No data to show</h1>') : queryAction(res, error, rows, table)
            }
        )
    }
}