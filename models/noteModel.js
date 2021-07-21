const connection = require('../connection');


function createNote({title,description,idUser}){
    let query = `
        Insert Into note(title,description,date,idUser)values(?,?,current_timestamp,?);
    `
    return connection.runQuery(query,[title,description,idUser]);
}
function getNotesByIdUser(idUser){
    let query = `
        select * from note where idUser = ?
    `
    return connection.runQuery(query,[idUser]);
}
function updateNote({idNote,title,description}){
    let query =  `
        Update note
        Set  title = ? , description = ? , date = current_timestamp
        Where idNote = ?
    `
    return connection.runQuery(query,[title,description,idNote]);
}
function getNote(idNote){
    let query =  `
        select * from note where idNote = ?
    `
    return connection.runQueryRow(query,[idNote]);
}
function deleteNote(idNote){
    let query = `
        delete from note where idNote = ?
    `
    return connection.runQuery(query,[idNote]);
}
module.exports={
createNote,
getNotesByIdUser,
updateNote,
getNote,
deleteNote
}