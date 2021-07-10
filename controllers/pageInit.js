const constants = require('../constants');

async function home(req, res) {
    try {
        //let profiles = await userModel.get();

        let data = {
            test: true,
            //profiles
        }

        res.send(data);

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

module.exports = {
    home
}