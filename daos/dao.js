const daoCommon = require('./common/daoCommon')

const actorDao = {
    ...daoCommon,
    ...require('./api/actorDao')
}

const companyDao = {
    ...daoCommon, 
    ...require('./api/companyDao')
}

const directorDao = {
    ...daoCommon, 
    ...require('./api/directorDao')
}

const programDao = {
    ...daoCommon,
    ...require('./api/programDao')
}

const streamDao = {
    ...daoCommon, 
    ...require('./api/streamDao')
}

module.exports = {
    actorDao,
    companyDao,
    directorDao,
    programDao,
    streamDao
}


