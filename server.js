require('dotenv').config();
const express = require('express')
const cors = require('cors')
const connectDB = require('./src/config/db')
const userRoutes=require('./src/routes/user.routes')
const expenseRoutes=require('./src/routes/expense.routes')
const notFound = require('./src/middleware/notfound.middleware')
const errorHandler= require('./src/middleware/errorHandler.middleware');
const errorhandler = require('./src/middleware/errorHandler.middleware');
const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:'Expense Management Api is running'
    })
})

app.use('/api/users',userRoutes)

app.use('/api/expense',expenseRoutes)

app.use(notFound)

app.use(errorhandler)

const PORT = process.env.PORT ||3000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
