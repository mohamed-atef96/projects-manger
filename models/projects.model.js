const mongoose = require('mongoose');
const {Schema} = mongoose;
const projectSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    tasks:[{
        type:Schema.Types.ObjectId,
        ref:'Tasks'
    }], 
} , {timestamps:true});

const Projects = mongoose.model('Projects' , projectSchema);
module.exports = Projects;
