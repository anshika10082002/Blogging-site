const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")

const blogController= require("../controllers/blogController")

const Middleware = require("../Middleware/auth")


//=============================================================================================================//

router.post('/authors',authorController.createAuthor) // Creating Authors Data 

router.post('/login',authorController.loginAuthor)  //author login and generate token 

router.post("/blogs",Middleware.authenticate,Middleware.auth2,blogController.createBlog)  // Creating blog 

router.get('/blogs',Middleware.authenticate,blogController.getblog) //Get Filtered Vlogs 

router.put('/blogs/:blogId',Middleware.authenticate,blogController.updatedBlog) // Update Blog 

router.delete("/blogs/:blogId",Middleware.authenticate,blogController.deleteBlog) //Delete blog by path param-blogId 

router.delete("/blogs",Middleware.authenticate,blogController.deleteDocument) // Delete blog by query params  


module.exports = router;







//router.get('/getblogs',blogController.getblogwithauthor) //Getting Blog data with Author details EXTRA