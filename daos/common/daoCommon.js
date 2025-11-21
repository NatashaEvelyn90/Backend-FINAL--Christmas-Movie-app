const connect = require('../../config/dbconfig')
const{ queryAction} = require('../../helpers/queryAction')

const daoCommon = {

    //! New Method using the queryAction helper 
    //? This is a shorter and cleaner way. If you want to see the old way, check the bootom of this code. 
    findAll: (res, table)=> {
        connect.execute(
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    //! New Method using queryAction for finding Id
    //? Lean and clean code  
    findById: (res, table, id)=> {
        connect.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    //! New Method of using queryAction for Sorting
    //? Lets sort with clean code
    sort: (res, table, sorter)=> {
        connect.query(
            `SELECT * FROM ${table} ORDER BY ${sorter};`,
            (error, rows)=>{
                queryAction(res, error, rows, table)
            }
        )
    },  

    //! This is how you will add more of anything(movies, directors, etc) POST
    create: (req, res, table) => {

        //! request.body =>{} 
        if(Object.keys(req.body).length === 0) { //Object must be capitalized
            //! Object.keys(obj) => array of keys
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

    //! if we mess up, we can fix our issue PATCH
    update: (req, res, table) => {
        // first, we would need to check to see if the id is equal to a number. id == number
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
                        // res.send(`Changed${dbres.changedRows} row(s)`)
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
    },

    //! Deleting records 
    delete: (res, table, id)=> {
        console.log(`${table}_id: ${id}`)

        connect.execute(`
            DELETE from ${table} 
            WHERE ${table}_id = ${id};
            SET @num := 0;
            UPDATE ${table} 
            SET ${table}_id = @num := (@num +1);
            ALTER TABLE ${table} AUTO_INCREMENT = 1;`,

            (error, dbres)=> {
                if(!error) {
                    res.send('Record Deleted')
                } else {
                    res.json({
                        "error":true,
                        "message": error
                    })
                }
            }
        )
    }
}

module.exports = daoCommon