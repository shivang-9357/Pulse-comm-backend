const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userDetails:{
        username:{type:String, required:true},
        password:{type:String, required:true},
        subAgentName:{type:String, required:true},
        phone:{type:Number, default:null}
    },
    userPrices:{
        pttUserPrice:{
            monthly:{type:Number, default:null},
            quarterly:{type:Number, default:null},
            halfYearly:{type:Number, default:null},
            yearly:{type:Number, default:null},
            oneTime:{type:Number, default:null}
        },
        dispatcherAcc:{
            monthly:{type:Number, default:null},
            quarterly:{type:Number, default:null},
            halfYearly:{type:Number, default:null},
            yearly:{type:Number, default:null},
            oneTime:{type:Number, default:null}
        },
        controlStationAcc:{
            monthly:{type:Number, default:null},
            quarterly:{type:Number, default:null},
            halfYearly:{type:Number, default:null},
            yearly:{type:Number, default:null},
            oneTime:{type:Number, default:null}
        }
    }
})

module.exports = mongoose.model('User', userSchema);