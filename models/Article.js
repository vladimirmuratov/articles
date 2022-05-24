const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    body: {type: String, required: true},
}, {
    timestamps: { createdAt: 'created_at' }
})

module.exports = model('Article', schema)