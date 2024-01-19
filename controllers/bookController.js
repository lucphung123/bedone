const slugify = require('slugify')
const fs = require('fs')
const { Book, Author } = require("../model/model");

const bookController = {
  //ADD A BOOK
  addABook: async (req, res) => {
    try {
      const file = req.file
      if (!file) {
        return res.status(422).json('file bị thiếu');
      }
      const { name, price, genres, author } = req.body;
      if (author === undefined || author === '') {
        return res.status(422).json('tác giả không được rỗng');
      }
      if (name === undefined || name === '') {
        return res.status(422).json('tên không được rỗng');
      }

      const slug = slugify(name);

      const image = `/images/${file.filename}`
      fs.copyFileSync(file.path, `${__dirname}/../public/${image}`)

      const newBook = new Book({
        name: name,
        price: price,
        genres: genres ? JSON.parse(genres) : null,
        author: author,
        image: image,
        slug: slug,
        publishedDate: new Date(),
      });

      const savedBook = await newBook.save();

      return res.status(200).json(savedBook);
    } catch (err) {
      console.log('error: ', err);
      return res.status(500).json(err);
    }
  },
  //GET ALL BOOKS
  getAllBooks: async (req, res) => {
    try {
      const allBooks = await Book.find();
      res.status(200).json(allBooks);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A BOOK
  getABook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).populate("author");
      res.status(200).json(book);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE BOOK
  updateBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      await book.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE BOOK
  deleteBook: async (req, res) => {
    try {
      await Author.updateMany(
        { books: req.params.id },
        { $pull: { books: req.params.id } }
      );
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = bookController;
