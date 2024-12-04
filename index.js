const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 8000;

//middleWare
app.use(cors())
app.use(express.json());

// equipify
// huvXjIR1fOxHMQFO

const {
    MongoClient,
    ServerApiVersion
} = require('mongodb');
const uri = "mongodb+srv://equipify:huvXjIR1fOxHMQFO@cluster0.wr4sb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
        await client.connect();
        console.log("Connected to MongoDB!");

        app.get('/', (req, res) => {
            res.send('Hello hey jubayer hi')
        })
        // Creating a Database name and collection name
        const database = client.db('equipifyDB').collection('products');

        // POST: get the data from client side and post to databse
        app.post('/products', async(req,res)=>{
            const newProduct = req.body;
            console.log(newProduct);
            const result = await database.insertOne(newProduct);
            res.send(result);
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