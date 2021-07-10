const securityFunctions = require('../securityFunction');
const userModel         = require('../models/userModel');
const securityModel     = require('../models/securityModel');
const constants         = require('../constants');
async function signUp(req, res) {
    try {
        
        let exist = await userModel.getPasswordByEmail(req.body.email);
        if (exist) {
            let data = {
                errorMessage: 'El correo electrónico que quieres usar ya existe',
                status: false
            }
        res.send(data);
        return;
        }
        else{
            let passwordHash = await securityFunctions.bcryptHashFunc(req.body.password);
            let token = await securityFunctions.createToken(req.body.email);
            await userModel.signUp({
                name : req.body.name,
                lastName : req.body.lastName,
                weight : req.body.weight,
                height : req.body.height,
                imc : req.body.imc,
                email: req.body.email,
                password: passwordHash
            });
            let idData = await userModel.getIdByEmail(req.body.email);
            let id = idData.id;
            await securityModel.setToken(token,id);
            
            let data = {
                status: true,
                token: token
            }
            res.send(data);
            console.log(req.body);
            
        }
    } catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}

async function signIn(req, res) {
    try {

        let exist = await userModel.getPasswordByEmail(req.body.email);
        if (!exist) {
            let data = {
                header:'No se inicio sesion',
                errorMessage: 'Datos Incorrectos',
                status: false
            }
            res.send(data);
            return;
        }
        let password = req.password;
        let verifypass = await securityFunctions.bcryptCompareFunc(req.body.password,password);
        if(verifypass){
            let token = await securityFunctions.createToken(req.body.email);
            let idData = await userModel.getIdByEmail(req.body.email);
            let id = idData.id;
            await securityModel.setToken(token,id);
            let data = {
                status: true,
                token: token
            }
            res.send(data);
        }
        else{
            let data = {
                header:'No se Inicio sesion',
                errorMessage: 'Datos Incorrectos',
                status: false
            }
            res.send(data);
        }
    } catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}

module.exports={
    signUp,
    signIn
}