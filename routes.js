const userController = require('./controllers/userController');
const scheduledController = require('./controllers/scheduledController');
const outflowController = require('./controllers/outflowController');
const incomeController = require('./controllers/incomeController');
const analiticsController = require('./controllers/analitycsController');
const automationController = require('./controllers/automationController');


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
    app.post('/scheduled/getIncomesLimiter',scheduledController.getIngresosLimiter);
    app.post('/scheduled/getOutflowsLimiter',scheduledController.getEgresosLimiter);
    app.post('/scheduled/getOutflows',scheduledController.getOutflowsByIdUser);

    app.post('/scheduled/getScheduled',scheduledController.getScheduledByIdScheduledIdUser);
    app.post('/scheduled/getSchedulesByIdOptions',scheduledController.getSchedulesByIdOptions);
    app.post('/scheduled/getSchedules',scheduledController.getSchedulesByDate);
    app.post('/scheduled/getAllSchedules',scheduledController.getSchedulesByDate);

    app.post('/scheduled/getSaldoActual',scheduledController.getSaldoActual);
    app.post('/scheduled/getSaldoFuturo',scheduledController.getSaldoFuturo);
    app.post('/scheduled/getIngresosFuturos',scheduledController.getIngresosFuturos);
    app.post('/scheduled/getEgresosFuturos',scheduledController.getEgresosFuturos);
    ///////////////////////////////////////////////////
    app.post('/outflow/create',outflowController.addOutflow);
    app.post('/outflow/getOutlowsDate',outflowController.getOutflowsByDate); 
    app.post('/outflow/getBiggerOutflowsInLastDays',outflowController.getBiggerOutflowsInLastDaysM);  //GRAFICOS -->
    app.post('/outflow/getOutflowsAmountDate',outflowController.getOutflowsAmountByDate);  //GRAFICOS -->
    ///////////////////////////////////////////////////
    app.post('/income/create',incomeController.addIncome);
    app.post('/income/getBiggerIncomesInLastDays',incomeController.getBiggerIncomesInLastDaysM);  //GRAFICOS -->
    app.post('/income/getIncomesDate',incomeController.getIncomesByDate);
    app.post('/income/getIncomesAmountDate',incomeController.getIncomesAmountByDate);
    ///////////////////////////////////////////////////
    app.post('/analitycs/updateSchedulesDiversionController',analiticsController.updateSchedulesDiversionController); //PARTE DE ASIGNAR CATEGORIAS
    app.post('/analitycs/updateSchedulesHigieneController',analiticsController.updateSchedulesHigieneController); //PARTE DE ASIGNAR CATEGORIAS
    app.post('/analitycs/updateSchedulesRopaController',analiticsController.updateSchedulesRopaController); //PARTE DE ASIGNAR CATEGORIAS
    app.post('/analitycs/updateSchedulesTransporteController',analiticsController.updateSchedulesTransporteController); //PARTE DE ASIGNAR CATEGORIAS
    app.post('/analitycs/updateSchedulesCasaController',analiticsController.updateSchedulesCasaController); //PARTE DE ASIGNAR CATEGORIAS
    app.post('/analitycs/updateSchedulesCuentasPagosController',analiticsController.updateSchedulesCuentasPagosController); //PARTE DE ASIGNAR CATEGORIAS
    app.post('/analitycs/updateSchedulesAlimentacionController',analiticsController.updateSchedulesAlimentacionController); //PARTE DE ASIGNAR CATEGORIAS

    //DEMAS ANALITICAS
    app.post('/analitycs/analitycsGetScheduledByCategory',analiticsController.getSchedulesAnaliticsController);
    app.post('/analitycs/analitycsGetScheduledByCategoryLimiter',analiticsController.getSchedulesAnaliticsLimiterController);
    app.post('/analitycs/analitycsGetScheduledTransport',analiticsController.getSchedulesTransportController);
    app.post('/analitycs/analitycsGetScheduledWork',analiticsController.getSchedulesWorkController);
    ///////////////////////////////////////////////////
    app.get('/ok',analiticsController.okController);
    app.get('/automationDataBaseStop',automationController.UpdateDataBaseSchedulesStop);
    app.get('/automationDataBaseStart',automationController.UpdateDataBaseSchedulesStart);
    /////////////////////////////////////////////////////////////////
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