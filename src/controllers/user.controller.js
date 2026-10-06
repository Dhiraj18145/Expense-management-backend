const user = require('../models/user.model')
const{isValidEmail} = require('../utils/validate.utils')

const createuser = async(req,res,next)=>{
    try{
        const{name,email} = req.body

        if(!name || !email){
            return res.status(400).json({
                success:false,
                message:"name and email are required"
            })
        }
        if(!isValidEmail(email)){
            return res.status(400).json({
                success:false,
                message:'invalid email'
            })
        }
        const existinguser = await user.findOne({email})

        if(existinguser){
            return res.status(409).json({
                success:false,
                message:'email already existed'
            })
        }
        const user = await user.create({
            name,
            email
        })
        res.status(201).json({
            success: true,
            message:'user created successfuly',
            data:user
        })

    }catch(error){
        next(error)
    }
}

const getusers =async(req,res,next)=>{
    try{
        const users = await user.find()
        res.json({
            success:true,
            data:users
        })
    }catch(error){
        next(error)
    }
}

const getuserById =async(req,res,next)=>{
    try{
        const{id}= req.params
        if(!isValidId(id)){
            return res.status(400).json({
                succcess:false,
                message:'invalid user Id'
            })
        }
        const user = await user.findById(id)
        if(!user){

            return res.status(404).json({
                success:false,
                message:'user not found'
            })
        }
        res,json({
            success:true,
            data:user
        })
    }catch(error){
        next(error)
    }
}

module.exports={
    createuser,
    getusers,
    getuserById
}
