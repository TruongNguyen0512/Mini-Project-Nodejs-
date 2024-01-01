const express = require("express") 
const app = express()  
const path = require("path") 
const hbs  = require("hbs")
const collection = require("./mongodb")

const templatePath =  path.join(__dirname,'../template')

app.use(express.static('public'));

app.use(express.json())
app.set('view engine','hbs')
app.set('views',templatePath)

app.use(express.urlencoded({extended:false}))

app.get('/',(req,res) =>{
    res.render("login")
})  

app.get('/signup',(req,res) =>{
    res.render("signup")
})

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    const checking = await collection.findOne({ name: req.body.name })

    try {
        if (checking && checking.name === req.body.name && checking.password === req.body.password) {
            res.send("User details already exist")
        } else {
            await collection.insertMany([data])
            res.status(201).render("home", {
                naming: req.body.name
            })
        }
    } catch (error) {
        res.status(500).send("Error occurred")
    }
})


app. post('/login',async(req,res) =>{
    const data = {
        name : req.body.name  ,
        password : req.body.password   
    }
    const checking  = await collection.findOne({name : req.body.name ,password :req.body.password}) 
    try {
        if(checking.name === req.body.name && checking.password === req.body.password) {
            res.status(201).render("home", {
                naming: req.body.name
            })

        }else {
            res.status(400).json({success:true,message:'bad request '}) 
        }
        
    } catch (error) {
        console.log(error) 
    }

   
    
})

app.listen(3000,()=> {
    console.log('port conected !')
})   