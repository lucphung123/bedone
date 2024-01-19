const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  publishedDate: {
    type: String,
  },
  genres: {
    type: [String],
  },
  slug: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

let Book = mongoose.model("Book", bookSchema);
let Author = mongoose.model("Author", authorSchema);

module.exports = { Book, Author };
