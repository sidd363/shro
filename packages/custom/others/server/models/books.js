var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bookSchema = new Schema({

    globalbookid: {
        type: String
    },
    title: {
        type: String
    },
    ebookisbn10: {
        type: String
    },
    ebookisbn13: {
        type: String
    },
    printisbn10: {
        type: String
    },
    printisbn13: {
        type: String
    },
    librarysupported: {
        type: String
    },
    editiontype: {
        type: String
    },
    previewlink:{
        type: String
    },
    authors: []
    
});

mongoose.model('book', bookSchema);