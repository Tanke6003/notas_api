const pageInitController = require('./controllers/pageInit');
const UserAuthController = require('./controllers/user');
const noteController     = require('./controllers/note');
const loadRoutes = (app) => {
    //PageInitialization
    app.get('/pageInit/home',pageInitController.home);
    //auth
    app.post('/authUser/signUp',UserAuthController.signUp);
    app.post('/authUser/signIn',UserAuthController.signIn);
    //create notas
    app.post('/create-note',noteController.createNote);
    //notes
    app.get('/notes',noteController.getNotes);
    //note
    app.post('/detalles-nota',noteController.getNote);
    app.post('/detalles-nota/delete',noteController.deleteNote);
    //edit note
    app.post('/edit-note/getNote',noteController.getNote);
    app.post('/edit-note/editNote',noteController.editNote);
}
module.exports = {
    loadRoutes
}