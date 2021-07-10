var md5 = require('md5');
const bcrypt = require('bcrypt');

function createToken(dataString){
    return new Promise(async (resolve, reject) => {
        let md5Token = md5(dataString + Date.now().toString());
        resolve(md5Token);
    });
}

function bcryptHashFunc(dataString){
    return new Promise(async (resolve, reject) => {
        bcrypt.hash(dataString, 10, async function (err, hash) {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    });
}

function bcryptCompareFunc(data,encrypted){
    return new Promise(async (resolve, reject) => {
        bcrypt.compare(data, encrypted, async function (err, result) {
            if (err) {
                reject(err)
            }
            if(result)resolve(true)
            else resolve(false)
        })
    });
}


module.exports = {
    createToken,
    bcryptHashFunc,
    bcryptCompareFunc
}