var ADMIN = require('../model/admin')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

exports.SECURE = async (req, res, next) => {
    try {
        // console.log('hello');
        
        const token = req.headers.authorization    // token check    
        if (!token) {
            throw new Error("Admin Token is not valid");
        }

        const isValidToken = jwt.verify(token, "admin")         // orignal check token after work
        // console.log(isValidToken);

        const isuser = await ADMIN.findById(isValidToken.id)     // check for user login in database(mongodb)

        if (!isuser) {
            throw new Error("user is not login Enter Valid Token")             // user logout after not login with token
        }

        next()
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Unsuccessfully",
            error: error.message
        })
    }
}


exports.Adminread = async (req, res, next) => {

    try {

        let findData = await ADMIN.find()

        res.status(200).json({
            status: "success...",
            message: "Admin read successfull",
            data: findData
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Admin read unsuccessfully",
            error: error.message
        })
    }

}

exports.Adminsignup = async function (req, res, next) {
    try {
        let { name, email, password, mobailnumber } = req.body

        let adminCreate = await ADMIN.create({
            name,
            email,
            password,
            mobailnumber
        });
        res.status(201).json({
            status: 'success...',
            message: 'Admin signup successfully',
            data: adminCreate
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: 'Admin signup unsuccessfully',
            error: error.message
        })
    }
}

exports.Adminlogin = async (req, res, next) => {

    try {
        let { email, password } = req.body

        let findemail = await ADMIN.findOne({ email })
        if (!findemail) throw new Error("Email id is invalid");

        let findpassword = await ADMIN.findOne({ password })
        if (!findpassword) throw new Error("Password is invalid");

        let token = jwt.sign({ id: findemail._id }, "admin")

        res.status(200).json({
            status: "Success...",
            message: "Admin Login Successfull",
            data: findemail,
            token
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Admin Login unsuccessfull",
            error: error.message
        })
    }

}