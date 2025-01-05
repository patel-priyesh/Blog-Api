var BLOG = require('../model/blog')
const path = require("path")
const fs = require("fs")
 
exports.blogcreat = async (req, res, next) => {
    try {
        let { title, description, author, date, category } = req.body
        // console.log("Request body:", req.body);

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                status: "error",
                message: "At least one image is required.",
            });
        }

        let blogdatacreat = await BLOG.create({
            title,  
            description,
            author,
            date,
            category,
            images: req.files.map(el => el.filename),
        })

        res.status(201).json({
            status: "success...",
            message: "BLOG creat successfull",
            data: blogdatacreat
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "BLOG creat failed",
            data: error.message
        })
    }

}

exports.blogread = async (req, res, next) => {
    try {
        const blog = await BLOG.find()
        res.status(200).json({
            status: "success...",
            message: "BLOG read successfull",
            data: blog
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "BLOG read failed",
            data: error.message
        })
    }

}

exports.blogupdate = async (req, res, next) => {
    try {
        
        let blogtoupdate = await BLOG.findById(req.params.id)
        if (!blogtoupdate) throw new Error("Blog not found");
        
        let updateimage;
        if(req.files && req.files.length > 0) {
                
            blogtoupdate.images.map(el => fs.unlinkSync(`./public/blog-image/${el}`));
            updateimage = req.files.map(file => file.filename);
            }
            else {
                updateimage = blogtoupdate.images;
            }
        let updateData = { ...req.body, images: updateimage };

        let blogdataupdate = await BLOG.findByIdAndUpdate(req.params.id, updateData,{new : true})
        
        res.status(200).json({
            status: "success...",
            message: "BLOG update successfull", 
            data: blogdataupdate
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "BLOG update failed",
            data: error.message
        })
    }

}

exports.blogdelete = async (req, res, next) => {
    try {
        let blogtodelete = await BLOG.findById(req.params.id)
        if (!blogtodelete) throw new Error("Blog not found");
                
            blogtodelete.images.map(el => fs.unlinkSync(`./public/blog-image/${el}`));

        let blogdatadelete = await BLOG.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "success",
            message: "BLOG delete successful",
            data: blogdatadelete    
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "BLOG delete failed",
            data: error.message,
        });
    }
};
