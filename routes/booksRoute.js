const express = require('express');
const Book = require('../Models/bookModel')

const router = express.Router()

//add books to db
router.post('/', async (req,res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author||
            !req.body.publishedYear
            ){
                return res.status(400).send({
                    message:"send all required fields",
                })
            }
        const newBook = {
            title  : req.body.title,
            author : req.body.author,
            publishedYear : req.body.publishedYear 
        }
    const book = await Book.create(newBook);

    return res.send(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//find books
router.get('/',async (req,res)=>{
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count : books.length,
            data: books
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//find by id
router.get('/:id',async (req,res)=>{
    try {

        const { id } = req.params;
        const book = await Book.findById(id)

        return res.send(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
        
    }
})

//update book data
router.put('/:id',async (req,res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author||
            !req.body.publishedYear
        ){
            return res.status(400).send({
                message:"Add all required fields"
            })
        }
        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id,req.body)

        if(!result){
            return res.status(404).send({message: "Book Not Found"})
        }
        return res.status(200).send({message: "updated successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

//delete book by id 
router.delete('/:id',async (req,res)=>{
    try {
        
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message:"Book not Found"});
        }

        return res.status(200).send({message:"Book deleted Successfully"})

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

module.exports = router;