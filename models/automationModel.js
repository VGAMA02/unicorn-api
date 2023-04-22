const conexion = require('../connection');

function UpdateSchedulesDataBaseSingles(){
    let query = `CALL Up_UpdateScheduledSingleInputs();`
    return conexion.runQuery(query);
}
function UpdateSchedulesDataBaseSemanales(){
    let query = `CALL Up_UpdateInputsSemanalesDatabase();`
    return conexion.runQuery(query);
}
function UpdateSchedulesDataBaseQuincenales(){
    let query = `CALL Up_UpdateInputsQuincenalesDatabase();`
    return conexion.runQuery(query);
}
function UpdateSchedulesDataBaseMensuales(){
    let query = `CALL Up_UpdateInputsMensualesDatabase();`
    return conexion.runQuery(query);
}
function UpdateSchedulesDataBaseAnuales(){
    let query = `CALL Up_UpdateInputsAnualesDatabase();`
    return conexion.runQuery(query);
}

module.exports = {UpdateSchedulesDataBaseSingles,UpdateSchedulesDataBaseSemanales,UpdateSchedulesDataBaseQuincenales,UpdateSchedulesDataBaseMensuales,UpdateSchedulesDataBaseAnuales}