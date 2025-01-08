var AUTHOR = require('../model/author')
const path = require("path")
const fs = require("fs");
let jwt = require("jsonwebtoken")
let bcrypt = require('bcrypt');

exports.SECURE = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) throw new Error("Invalid token");
        
        let isValidToken = jwt.verify(token, "author");

        req.author = isValidToken.id;

        let isuser = await AUTHOR.findById(isValidToken.id);
        
        if (!isuser) throw new Error("User is not login");
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}


exports.Authorread = async (req, res, next) => {

    try {

        let findData = await AUTHOR.find()

        res.status(200).json({
            status: "success...",
            message: "Author read successfull",
            data: findData
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Author read unsuccessfully",
            error: error.message
        })
    }

}

exports.Authorsignup = async function (req, res, next) {
    try {
        let { name, email, password } = req.body

        let check = await AUTHOR.findOne({ email: email });
        if (check) throw new Error("Email is already exist");

        let authorCreate = await AUTHOR.create({
            name,
            email,
            password,
            profile: req.file.filename

        });
        res.status(201).json({ 
            status: 'success...',
            message: 'Author signup successfully',
            data: authorCreate
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: 'Author signup unsuccessfully',
            error: error.message
        })
    }
}

exports.Authorlogin = async (req, res, next) => {

    try {
        let { email, password } = req.body

        let findemail = await AUTHOR.findOne({ email })
        if (!findemail) throw new Error("Email id is invalid");

        let findpassword = await AUTHOR.findOne({ password })
        if (!findpassword) throw new Error("Password is invalid");

        const token = jwt.sign({ id: findemail._id }, "author")

        res.status(200).json({
            status: "Success...",
            message: "Author Login Successfull",
            data: findemail,
            token
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Author Login unsuccessfull",
            error: error.message
        })
    }

}

exports.AuthorUpdate = async (req, res, next) => {
    try {
        let authorToUpdate = await AUTHOR.findById(req.params.id);
        if (!authorToUpdate) throw new Error("AUTHOR not found");

        // Check if a profile image exists and if the file exists on the file system
        if (req.file && authorToUpdate.profile) {
            const filePath = `./public/author-image/${authorToUpdate.profile}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // Update the author details
        let updateData = { ...req.body };
        if (req.file) {
            updateData.profile = req.file.filename; // Update the profile picture
        }

        let updatedAuthor = await AUTHOR.findByIdAndUpdate(req.params.id, updateData, { new: true });

        res.status(200).json({
            status: "Success...",
            message: "Author Update Successful",
            data: updatedAuthor,
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Author Update Unsuccessful",
            error: error.message,
        });
    }
};


exports.Authordelete = async (req, res, next) => {
    try {
        let authorTodelete = await AUTHOR.findById(req.params.id);
        if (!authorTodelete) throw new Error("AUTHOR not found");

        if (authorTodelete.profile) {
            const filePath = `./public/author-image/${authorTodelete.profile}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        let deleteAuthor = await AUTHOR.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "Success...",
            message: "Author Delete Successful",
            data: deleteAuthor,
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Author Delete Unsuccessful",
            error: error.message,
        });
    }
};


