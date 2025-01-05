let mongoose = require("mongoose")
let Schema = mongoose.Schema

let adminSchema = new Schema({
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
    mobailnumber:{
        type: String,  required: [true,"mobile-number is required. please enter mobile-number...!"],trim:true,unique:true}
})

let ADMIN = mongoose.model("admin",adminSchema)
module.exports = ADMIN