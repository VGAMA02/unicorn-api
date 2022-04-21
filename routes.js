const userController = require('./controllers/userController');
const scheduledController = require('./controllers/scheduledController');
const outflowController = require('./controllers/outflowController');
const incomeController = require('./controllers/incomeController');
const loadRoutes = (app) => {
    ////////////////////////////////////////////////////
    app.post('/pruebas',userController.prueba);
    app.post('/user/register',userController.addUser);
    app.post('/user/login',userController.login);
    ///////////////////////////////////////////////////
    app.post('/scheduled/create',scheduledController.addScheduled);
    app.post('/scheduled/changeScheduledAll',scheduledController.changeScheduled);
    app.post('/scheduled/changeScheduled',scheduledController.changeScheduledStatus);
    app.post('/scheduled/getIncomes',scheduledController.getIncomesByIdUser);
    app.post('/scheduled/getOutflows',scheduledController.getOutflowsByIdUser);

    app.post('/scheduled/getIncomesDate',scheduledController.getIncomesByDate);
    app.post('/scheduled/getOutlowsDate',scheduledController.getOutflowsByDate); 

    app.post('/scheduled/getScheduled',scheduledController.getScheduledByIdScheduledIdUser);
    app.post('/scheduled/getSchedulesByIdOptions',scheduledController.getSchedulesByIdOptions);
    app.post('/scheduled/getSchedules',scheduledController.getSchedulesByDate);
    app.post('/scheduled/getAllSchedules',scheduledController.getSchedulesByDate);

    app.post('/scheduled/getSaldoActual',scheduledController.getSaldoActual);
    app.post('/scheduled/getSaldoFuturo',scheduledController.getSaldoFuturo);
    ///////////////////////////////////////////////////
    app.post('/outflow/create',outflowController.addOutflow);

    ///////////////////////////////////////////////////
    app.post('/income/create',incomeController.addIncome);
    ///////////////////////////////////////////////////

    ///////////////////////////////////////////////////
    // //PageInitialization
    // app.get('/pageInit/home',pageInitController.home);
    // //auth
    // app.post('/authUser/signUp',UserAuthController.signUp);
    // app.post('/authUser/signIn',UserAuthController.signIn);
    // app.post('/authUser/signOut',UserAuthController.signOut);
    // //create notas
    // app.post('/create-note',noteController.createNote);
    // //notes
    // app.get('/notes',noteController.getNotes);
    // //note
    // app.post('/detalles-nota',noteController.getNote);
    // app.post('/detalles-nota/delete',noteController.deleteNote);
    // //edit note
    // app.post('/edit-note/getNote',noteController.getNote);
    // app.post('/edit-note/editNote',noteController.editNote);
}
module.exports = {
    loadRoutes
}