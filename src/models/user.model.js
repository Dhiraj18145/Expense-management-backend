const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim: true,
            minilength:2
        },

        email:{
            type:String,
            required:true,
            trim:true,
            lowercase:true,
            unique:true
        }
    },
    {
        timestamp:true
    }
)

module.exports= mongoose.model('user',userSchema)