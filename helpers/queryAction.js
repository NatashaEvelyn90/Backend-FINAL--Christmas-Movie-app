//! obj= response (resp), e= error, r= rows, t= table 
//* this is written exactly like the formula in the daoCommon but with shorter letters. We will be using this helper file to replace the other code. The other code will be cleared out but the notes will still be there! This is our time saver. 

const queryAction = (obj, e, r, t) => {

    if(!e) {
        if(r.length === 1) {
            obj.json(...r)
        } else {
            obj.json(r)
        }
    } else {
        console.log(`DAO ERROR: ${e}`)
        obj.json({
            "message": 'error',
            "table": `${t}`,
            "error": error
        })
    }
}

module.exports = {
    queryAction
}