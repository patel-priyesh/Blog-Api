const CATEGORY = require('../model/category');
const path = require("path")
const fs = require("fs");

exports.categorycreate = async (req, res, next) => {
    try {
        const { name, description} = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                status: "error",
                message: "At least one image is required.",
            });
        }

        let categorydatacreate = await CATEGORY.create ({
            name,
            description,
            image : req.files.map(el => el.filename)           
        })
       
        res.status(201).json({
            status: "success...",
            message: "category creat successfull",
            data: categorydatacreate
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "category creat failed",
            data: error.message
        })
    }

}

exports.categoryread = async (req, res, next) => {
    try {
        const category = await CATEGORY.find()
        res.status(200).json({
            status: "success...",
            message: "CATEGORY read successfull",
            data: category
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "CATEGORY read failed",
            data: error.message
        })
    }

}

exports.categoryupdate = async (req, res, next) => {
    try {

        let findData = await CATEGORY.findById(req.params.id)
        if (!findData) throw new Error("Category is not found");
        
       let updateimage;
               if(req.files && req.files.length > 0) {
                       
                   findData.image.map(el => fs.unlinkSync(`./public/category-image/${el}`));
                   updateimage = req.files.map(file => file.filename);
                   }
                   else {
                       updateimage = findData.image;
                   }
               let updatedata = { ...req.body, image: updateimage };

        data = await CATEGORY.findByIdAndUpdate(req.params.id, updatedata, {new : true})
        
        res.status(200).json({
            status: "success...",
            message: "Category update successfull",
            data 
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "Category update failed",
            data: error.message
        })
    }

}

exports.categorydelete = async (req, res, next) => {
    try {
        let categorydelete = await CATEGORY.findById(req.params.id)
        if (!categorydelete) throw new Error("Category is not found");

        categorydelete.image.map(el => fs.unlinkSync(`./public/category-image/${el}`));
       
        let categorydatadelete = await CATEGORY.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "success",
            message: "BLOG delete successful",
            data: categorydatadelete    
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "BLOG delete failed",
            data: error.message,
        });
    }
};
