const express = require('express')
const router = express.Router()
const books = require('./books.json')
const localServer = "127.0.0.1:27017"
const {MongoClient}  = require('mongodb')

const uri = `mongodb://${localServer}/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0`;
const client = new MongoClient(uri);
 
async function connectDB() {                    //connecting to mongodb server
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    }
    
}

connectDB().catch(console.error)

router.get('/', async (req,res)=>{
    const data = await client.db("test").collection("books").find({}).toArray()
    res.json(data)
})

router.get('/:id', async (req, res)=>{
    const {id} = req.params
    const data = await client.db("test").collection("books").find({id: parseInt(id)}).toArray()
    res.json(data)
})

router.put('/:id',async (req, res)=>{
    const {id} = req.params
    const reqBody = req.body
    
    const result = await client.db("test").collection("books").updateMany({id: parseInt(id)}, {$set: reqBody})
    console.log(result)

    res.json({ message: `The book with id ${id} has been updated`})
})

router.post('/:id', async (req, res)=>{
    const body = req.body;
    console.log(body);

    const result = await client.db("test").collection("books").insertOne(body)
    res.json({ message: 'The book has been added' });
})

router.delete('/:id',async (req, res) => {
    const { id } = req.params;
    
    const result = await client.db("test").collection("books").deleteMany({id: parseInt(id)})
    res.json({ message: `Book with id #${id} has been deleted` });
});

module.exports = router