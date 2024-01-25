const express = require('express');
const user = require('../Models/userModel') 
const session = require('express-session');
const router = express.Router();

//session middleware
router.use(session({
    secret: 'this-is-session-passkey', // Change this to a secret key for session encryption
    resave: false,
    saveUninitialized: true,
  }));

//add user
router.post('/',async (req,res)=>{
    try {
        if(
            !req.body.userName ||
            !req.body.email ||
            !req.body.password ||
            !req.body.phone
        ){
            return res.send({
                message:"send all required fields",
            })
        }
        const newUser = {
            userName : req.body.userName,
            email : req.body.email,
            password : req.body.password,
            phone : req.body.phone
        }
    
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        
        const emailClone = await user.find({email:newUser.email})


            if (emailClone.length > 0) { //this  means there is at least one user with the specified email in the database.
                return res.send({
                    message: "Email already in use"
                });
            }
        if(newUser.userName.length<5){
            return res.send({
                message:"User name should be greater than 4"
            })
        }else if(!emailRegex.test(newUser.email)){
            return res.send({
                message:"please enter a valid email"
            })
        }else if(!passwordRegex.test(newUser.password)){
            return res.send({
                message:"password must contain atleast 1 letter, 1 number and minimum 8 charecters "
            })
        }

        const User = await user.create(newUser)

        res.status(200).send(User)
    
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//find user
router.get('/', async (req,res)=>{
    try {
        const users = await user.find({});

        res.status(200).json({
            count : users.length,
            data : users
        })
    } catch (error) {
        console.log(error.message);
    }
})

//find by id
router.get('/:id', async(req,res)=>{
    try {
        const {id} = req.params;

        const userData = await user.findById(id);

        if(!userData){
            res.send({
                message:"Something Error may Be user not Found please re-check"
            })
        }
        res.send(userData);
    } catch (error) {
        console.log(error.message);
    }
})

//update user

router.put('/:id',async (req,res)=>{
    try {

        if(
            !req.body.userName ||
            !req.body.email ||
            !req.body.password ||
            !req.body.phone
        ){
            res.status(500).send({
                message:"Add all required fields"
            })
        }

        const {id} = req.params

        const result = await user.findByIdAndUpdate(id,req.body);


        if(!result){
            res.status(404).send({
                message:"user not found"
            })
        }

        return res.status(200).send({message: "updated successfully"})
    } catch (error) {
        console.log(error.message);
    }
})


//delete User

router.delete('/:id' , async(req,res)=>{
    try {
        const { id } = req.params

        const result = await user.findByIdAndDelete(id)
        if(!result){
            res.status(404).json({
                message:"user not found"
            })
        }
        res.status(200).send({
            message:"deleted successfully"
        })
    } catch (error) {
        console.log(error.message);

    }
})

router.post('/login',async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    try {
        const result = await user.findOne({email});

        if(!result){
            res.send({message:"incorrect email or password",status:"error"})
        }else if(password !== result.password){
            res.send({message:"incorrect email or password",status:"error"})
        }else{
            req.session.user = result;
            res.send({authToken:email+"authorization",message:"logged in successfully",status:"success",result})
        }
    } catch (error) {
        console.log(err);
    }
})

router.get('/logout', (req, res) => {
    // Destroy the session to log out the user
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error", status: "error" });
      } else {
        res.send({ message: "Logged out successfully", status: "success" });
      }
    });
  });
module.exports = router;