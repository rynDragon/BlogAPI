const mongoose = require('mongoose')
const config = require('../helpers/config-helper')

// build the schema for MongoDB Documents
var schemaDefinition = new mongoose.Schema({
    'title': String,
    'author': String,
    'date': {
        type: Date,
        default: Date.new
    },
    'tags': [{}],
    'content': String,
    'tldr': String,
    'links': [{}],
    'sources': [{}],
    'private': Boolean,
    'archive': Boolean,
    'versions': [{}]
}, {
    collection: 'test'
})

// Creates the model from the Schema
const postSchema = mongoose.model(config.models.posts, schemaDefinition)
module.exports = postSchema