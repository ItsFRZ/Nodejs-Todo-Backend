const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({

    userinfo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    todo : {
        type : String,
        required : true
    },
    isChecked : {
        type : Boolean,
        default : false,
        
    }


},{
    timestamps : true
});

module.exports = TodoModel = mongoose.model('Todo',TodoSchema);