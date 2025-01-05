let mongoose = require('mongoose')
let Schema = mongoose.Schema

let CategorySchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name is required, please Enter Your Name']
    },
    description: {
        type: String,
        require: [true, 'Description is required, please Enter Your Description']
    },
    image: {
        type: [String],
        require: [true, 'Image is required, please Enter Your Image']
    },
})

let CATEGORY = mongoose.model('category', CategorySchema)
module.exports = CATEGORY;