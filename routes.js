const pageInitController = require('./controllers/pageInit');
const pageUserAuth = require('./controllers/user');
const loadRoutes = (app) => {
    //PageInitialization
    app.get('/pageInit/home',pageInitController.home);
    //auth
    app.post('/authUser/signUp',pageUserAuth.signUp);
    app.post('/authUser/signIn',pageUserAuth.signIn)
}
module.exports = {
    loadRoutes
}