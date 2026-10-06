const mongoose = require('mongoose')
const expenseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    amount:{
        type:Number,
        required:true,
        min: 0.01,
    },

    category:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        default: '',
        trim:true
    },

})

module.exports = mongoose.model('Expense',expenseSchema)
