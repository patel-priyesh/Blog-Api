var BLOG = require('../model/blog')
const path = require("path")
const fs = require("fs")

exports.blogcreat = async (req, res, next) => {
    try {
        let { title, description, author, date, category  } = req.body
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
            authorId : req.author,
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
        let findblog;
        if (req.query.search) {
            const search = req.query.search;
            findblog = await BLOG.find({
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { author: { $regex: search, $options: "i" } },
                    { category: { $regex: search, $options: "i" } },
                ],
            }).populate("authorId");
        } else {
            findblog = await BLOG.find({authorId : req.author}).populate("authorId");
        }

        res.status(200).json({
            status: "success...",
            message: "BLOG read successfully",
            data: findblog,
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "BLOG read failed",
            data: error.message,
        });
    }
};

exports.blogupdate = async (req, res, next) => {
    try {

        let blogtoupdate = await BLOG.findById(req.params.id)
        if (!blogtoupdate) throw new Error("Blog not found");

        let updateimage;
        if (req.files && req.files.length > 0) {

            blogtoupdate.images.map(el => fs.unlinkSync(`./public/blog-image/${el}`));
            updateimage = req.files.map(file => file.filename);
        }
        else {
            updateimage = blogtoupdate.images;
        }
        let updateData = { ...req.body, images: updateimage };

        let blogdataupdate = await BLOG.findOneAndUpdate({_id:req.params.id, authorId:req.author},updateData, { new: true })
        if (!blogdataupdate) {
            return res.status(400).json({
                status: "error",
                message: "Enter Valid Id And Token... Id And Token Is Not Match",
            });
        }

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

        
    let deleteblog = await BLOG.findOneAndDelete({_id:req.params.id,authorId : req.author});
        if(!deleteblog) {
            return res.status(400).json({
                status: "error",
                message: "Enter Valid Id And Token... Id And Token Is Not Match",
            })
        }
        blogtodelete.images.map(el => fs.unlinkSync(`./public/blog-image/${el}`));

        res.status(200).json({
            status: "success",
            message: "BLOG delete successful",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "BLOG delete failed",
            data: error.message,
        });
    }
};
