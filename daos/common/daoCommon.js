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
    countAll: (res, table, count)=> {
        connect.query(
            `SELECT COUNT(*) AS COUNT FROM ${table};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    //? SEARCH
    search: (req, res, table, allowedFields) => {
    const { field, term } = req.query;

    if (!field || !term) {
        return res.json({
            message: "Missing search field or term",
            example: `/table/search?field=title&term=foo`
        });
    }

    if (!allowedFields.includes(field)) {
        return res.json({ 
            message: "Invalid search field", 
            allowedFields 
        });
    }

    const sql = `SELECT * FROM ${table} WHERE ${field} = ?`;

    connect.execute(sql, [term], (error, rows) => {
        queryAction(res, error, rows, table);
    })
},



    //! Danger zone section
    // #region 
    //! CREATE Method (POST)
    create: (req, res, table) => {
        if(!req.body || Object.keys(req.body).length === 0) { //* Object must be capitalized
            return res.json({
                "error": true,
                "message": "No fields to create"
            });           
        } 

        if(req.file) {
            req.body.img_url = req.file.filename; //*stores filename in database
        }
        
        
        const fields = Object.keys(req.body)
        const values = Object.values(req.body)
        
        //* exectute can take 3 arguments, query can only take 2 arguments
        connect.execute(
            `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ? ;`,
            values,
            (error, dbres)=> {
                if(!error){
                    console.log(dbres)
                    res.render('pages/successPage', {
                        title: 'Form Submitted!',
                        name: 'Successfully Submitted!'
                    })
                } else {
                    console.log(`${table} Dao error: `, error)
                    res.render('pages/errorPage', {
                        title: 'ERROR PAGE',
                        name: 'Error'
                    });
                }
            }
        );
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