const mongoose = require('mongoose')

const scheme = new mongoose.Schema(
    {
        name: String,
    },
    { collection: 'users' }
)

const company = mongoose.model('Company', scheme)
module.exports = company
