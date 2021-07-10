const constants = require('../constants');
const userModel = require('../models/userModel');
const noteModel = require('../models/noteModel');
const securityModel = require('../models/securityModel');
async function createNote(req, res) {
    try {
        let dataToken = await securityModel.checkToken(req.body.token);
        if (!dataToken) {
            let data = {
                errorMessage: constants.INVALID_TOKEN_MESSAGE,
                session: false
            }
            res.send(data);
            return;
        }
        let dataNote={
            title : req.body.note.title,
            description : req.body.note.description,
            idUser : dataToken.idUser

        }
        await noteModel.createNote(dataNote);

        let data = {
            session: true,
            message: 'Nota creada'
        }

        res.send(data);

    } catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex
        }
        res.status(500).send(data);
    }
}
async function getNotes(req,res){
    try {
        let dataToken = await securityModel.checkToken(req.body.token);
        if (!dataToken) {
            let data = {
                errorMessage: constants.INVALID_TOKEN_MESSAGE,
                session: false
            }
            res.send(data);
            return;
        }
        let notes = await noteModel.getNotesByIdUser(dataToken.idUser);

        let data = {
            session: true,
            notes: notes
        }

        res.send(data);

    } catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex
        }
        res.status(500).send(data);
    }
}
module.exports={
    createNote,
    getNotes
}