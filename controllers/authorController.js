const validation  = require("../validator/validation");

const authors = require("../models/authorModel.js");

const jwt = require("jsonwebtoken");


let { isValidName, isValidEmail, isValidPassword, isEmpty } = validation //Destructuring

const createAuthor= async function(req,res){ // Checking body is empty or not
    try{
        let data = req.body
    if(Object.keys(data).length==0){
        return res.status(400).send({status:false,message:"Body is empty"})
    }

    let {fname,lname,title,email,password} = data //Destructuring

    if(!fname||!lname||!title||!email||!password) {
        return res.status(400).send({status:false,message:"this field is required"})
    }

/*------------------------Checking attributes are empty or not-----------------------------------*/

    if(!isEmpty(fname)){
        return res.status(400).send({status:false,message:"First Name is required"})
    }
    if(!isEmpty(lname)){
        return res.status(400).send({status:false,message:"Last Name is required"})
    }
    if(!isEmpty(title)){
        return res.status(400).send({status:false,message:"title  is required"})
    }
    if(!isEmpty(email)){
        return res.status(400).send({status:false,message:"Email is required"})
    }
    if(!isEmpty(password)){
        return res.status(400).send({status:false,message:"password is required"})
    }

/*-----------------------------------Checking Valid Title or Not------------------------------------------------*/

    if(title != "Mr" && title != "Mrs" && title != "Miss"){
        res.status(400).send({msg:"Not have appropiate title"})
    }

    if(!isValidName(fname)){ //  Name validation
        return res.status(400).send({status:false,message:"fname is Wrong"})
    }

    if(!isValidName(lname)){  // Name validation
        return res.status(400).send({status:false,message:"lname is wrong"})
    }

    if(!isValidEmail(email)){ // Email validation
        return res.status(400).send({status:false,message:"Please provide valid Email"})
    }

    if(!isValidPassword(password)){ // Password validation
        return res.status(400).send({status:false,message:"Your password must have 8 characters, contain at least one number or symbol, and have a mixture of uppercase and lowercase letters."})
    }
  
    /*-----------------------------------CREATING AUTHOR-----------------------------------------------------*/

    let createAuthor = await authors.create(data)
        return res.status(201).send({status:true,data:createAuthor})
    }
    catch(error){
          res.status(500).send({status:true,message:error.message})
    }
    
}

/* --------------------------------------------------AUTHOR-LOGIN---------------------------------------------- */

const loginAuthor = async function (req, res) {

    try{

        let emailId = req.body.emailId;
        let password = req.body.password;

    if(!isValidEmail(emailId)){ // Email validation
        return res.status(400).send({status:false,message:"Please provide valid Email"})
    }

    if(!isValidPassword(password)){ // Password validation
        return res.status(400).send({status:false,message:"Your password must have 8 characters, contain at least one number or symbol, and have a mixture of uppercase and lowercase letters."})
    }
  
    let author = await authors.findOne( { email: emailId, password: password } );
    if (!author)
      return res.send( { status: false, msg: "email or the password is not corerct" } );
  
    let token = jwt.sign(
      {
        authorId: author._id.toString(),
        batch: "Lithium",
        organisation: "FunctionUp",
        name:"Raj Nagwanshi, Anshika, Preeti Bissoyi, Monalisa Ganguli"
      },
      "functionup-lithium-very-very-secret-key"
    );
    res.setHeader("x-api-token", token);
    res.status(200).send({ status: true, token: token });

    }
      catch(error){
        res.status(500).send({msg:error.message})
      }
    
  };


module.exports.createAuthor = createAuthor

module.exports.loginAuthor = loginAuthor





