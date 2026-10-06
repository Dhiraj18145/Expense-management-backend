const mongoose = require('mongoose')

const isValidId = (id)=>{
    return
    mongoose.Types.ObjectId.isValid(id)
}

const isValidEmail =(email)=>{
    return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

module.exports ={
    isValidId,
    isValidEmail
}
