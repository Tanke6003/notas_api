const connection = require('../connection');

function closeToken(token){
    let query = `
        Update userSession
        Set endDate = CURRENT_TIMESTAMP
        Where token = BINARY ?
    `
    return connection.runQuery(query,[token]);
}

function closeTokens(idUser){
    let query = `
        Update userSession
        Set endDate = CURRENT_TIMESTAMP
        Where idUser = ?
    `
    return connection.runQuery(query,[idUser]);
}

function setToken(token, idUser){
    let query = `
        Insert Into userSession (token,idUser) 
        Values (?,?)
    `
    return connection.runQuery(query,[token,idUser]);
}

function checkToken(token){
    let query = `
        Select idUser From userSession
        Where token = BINARY ?
        And endDate Is Null
    `
    return connection.runQueryRow(query,[token]);
}

module.exports = {
    closeToken,
    closeTokens,
    setToken,
    checkToken
}