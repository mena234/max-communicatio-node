const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userScheme = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    country: String,
    emails: [
        {
            emailId: { type: Schema.Types.ObjectId, required: true},
            subject: { type: String },
            body: { type: String }
        }
    ]
})

module.exports = mongoose.model("User", userScheme)