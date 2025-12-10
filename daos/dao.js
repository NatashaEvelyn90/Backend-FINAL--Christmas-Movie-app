const daoCommon = require('./common/daoCommon')

const actorDao = {
    ...daoCommon,
    ...require('./api/actorDao')
}

const producerDao = {
    ...daoCommon, 
    ...require('./api/producerDao')
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
    producerDao,
    directorDao,
    programDao,
    streamDao
}


