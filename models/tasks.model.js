const mongoose = require("mongoose");
const { Schema } = mongoose;
const taskSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    progress:{
        type:Number,
        default:0
    },
    done:{
        type:Boolean,
        default:false
    }
} , {timestamps: true});
const Tasks = mongoose.model('Tasks' , taskSchema);
 module.exports = Tasks;