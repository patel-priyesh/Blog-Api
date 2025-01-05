let mongoose = require("mongoose")
let Schema = mongoose.Schema

let blogSchema = new Schema({
    title:{type:String,required:[true,"Title is required. please Enter Title",]},
    description:{type:String,required:[true,"Description is required. please Enter description",]},
    images:{type:Array,default: [],required:[true,"Images is required. please Enter Images",]},
    author:{type:String,required:[true,"Author is required. please Enter Author",]},
    date: { type: Date, default: Date.now },
    category:{type:String,required:[true,"Category is required. please Enter Category",]},
})

let BLOG = mongoose.model("blog",blogSchema)
module.exports = BLOG
