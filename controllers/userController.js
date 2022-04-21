const userModel = require("../models/userModel")
const constants = require("../constants")
const security  = require("../SecurityFunctions")
async function addUser(req,res){
    try {
        let exist = await userModel.getUserByEmail(req.body.email);
        if(exist){
            let data = {
                Message: 'El Correo ya existe, intente con otro',
                status: false
            }
            res.send(data);
            return
        }
        console.log(req.body);
        let passB = await security.bcryptHashFunc(req.body.password);
        await userModel.addUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthDate: req.body.birthDate,
            password: passB
        });
        let data = {
            status: true
        }
        res.send(data);
        
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function login(req,res){
    try {
       let exist = await userModel.getPasswordByEmail(req.body.email)
       let idUser = await userModel.getIdUserByEmail(req.body.email)
       console.log(idUser)
       idUser = JSON.parse(idUser['idUser']);
       console.log(idUser)
       console.log(req.body)
       if(!exist){
            let data = {
                Message: "Datos incorrectos"
            }
            res.send(data);
            return
       }
       if(await security.bcryptCompareFunc(req.body.password,exist.password))
       {
           let data = {
               status: true,
               idUser
           }
           res.send(data);
       }
       else
       {
            let data = {
                Message: "Datos incorrectos"
            }
            res.send(data);
            return
       }
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function prueba(req,res){
    try{
        let exist = await userModel.findUser(req.body.email,req.body.password); //await solo funciona en async functions
        console.log(req.body);
        console.log(exist);
        if(exist){
            let data = {
                Message: 'El id ya existe, intente con otro',
                status: false
            }
            res.send(data);
            return
        }
        else
        {
            let data = {
                Message: 'El id no existe',
                status: true
            }
            res.send(data);
            return
        }
    }catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex,
            status: false
        }
        res.status(500).send(data);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {addUser,prueba,login}

/*
{
    "firstName": "juan", "lastName": "Corrizo", "email": "juan@outlook.com", "birthDate": "2000-02-10", "password": "tostadasDeTinga"
}
*/