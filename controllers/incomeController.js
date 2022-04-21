const incomeModel = require("../models/incomeModel")
const constants = require("../constants")

async function addIncome(req,res){
    try {
        let exist = await incomeModel.getIncomeById(req.body.id);
        console.log(req.body);
        if(exist){
            let data = {
                Message: 'El income ya existe, intente con otro',
                status: false
            }
            res.send(data);
            return
        }
        console.log(req.body);
        await incomeModel.addIncome({
            amount: req.body.amount,
            date: req.body.date,
            status: req.body.status,
            description: req.body.description,
            idType: req.body.idType,
            idUser: req.body.idUser

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

module.exports = {addIncome}

/*
{
        "amount": "1200.22", "Date": "2000-02-30", "status": 1, "description":"me lo debe el csm del ñechero", "idType": 1, "idUser": 1
}
*/