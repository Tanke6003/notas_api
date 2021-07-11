const connection = require('../connection');

function signUp({nickName,email,password}){
    let query =  `
        Insert Into user(nickName,email,password)values(?,?,?)
    `
    return connection.runQuery(query,[nickName,email,password]);
}
function getPasswordByEmail(email){
    let query =  `
        select password from user where email = ?
    `
    return connection.runQueryRow(query,[email]);
} 
function getIdByEmail(email){
    let query =  `
        select idUser from user where email = ?
    `
    return connection.runQueryRow(query,[email]);
}
function getUserByNickName(nickName){
    let query =  `
        select * from user where nickName = ?
    `
    return connection.runQueryRow(query,[nickName]);
}
function changePassword(password,idUser){
    let query =  `
        Update user
        Set password = ?
        Where idUser = ?
    `
    return connection.runQuery(query,[password,idUser]);
}

module.exports={
    signUp,
    getPasswordByEmail,
    getIdByEmail,
    getUserByNickName,
    changePassword

}