let mongoose = require("mongoose")
let Schema = mongoose.Schema

let authorSchema = new Schema({
    name:{
        type: String,  required: [true,"name is required. please enter name...!"]},
    email: {
        type: String,  required: [true,"email is required. please enter email...!"],trim:true,unique:true,
        // match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please enter a valid emmail id']
    },
    password: {
        type: String,  required: [true,"password is required. please enter password...!"],trim:true,
        // match : [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'please enter a strong password']
    },
    profile:{
        type: [String],  required: [true,"profile is required. please enter profile...!"]}
})

let AUTHOR = mongoose.model("author",authorSchema)
module.exports = AUTHOR