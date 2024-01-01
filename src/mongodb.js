const mongoose = require('mongoose') 

mongoose.connect("mongodb+srv://dannynguyen:123@cluster0.qv0ubjc.mongodb.net/Login-out-practice?retryWrites=true&w=majority") 
.then (()=> {
    console.log("mongodb connected")

})
.catch (()=>{
    console.log('fail conection')
})

const LoginSchema = new mongoose.Schema({
    name : {
        type :String ,   
        required : true
    },
    password : {
        type: String ,
        rrquired : true
    }
})

const collection  = new mongoose.model('collection',LoginSchema)  

module.exports = collection 