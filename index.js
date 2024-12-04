const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 8000;

//middleWare
app.use(cors())
app.use(express.json());

const {
    MongoClient,
    ServerApiVersion
} = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.wr4sb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();
        console.log("Connected to MongoDB!");

        app.get('/', (req, res) => {
            res.send('Hello hey jubayer hi')
        })
        // Creating a Database name and collection name
        const productsClt = client.db('equipifyDB').collection('products');

        // POST: get the data from client side and post to databse
        app.post('/products', async(req,res)=>{
            const newProduct = req.body;
            console.log(newProduct);
            const result = await productsClt.insertOne(newProduct);
            res.send(result);
        })
        // GET: get the all product from database
        app.get('/products', async(req,res)=>{
            const cursor = productsClt.find();
            const result = await cursor.toArray();
            res.send(result)
        })


    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})