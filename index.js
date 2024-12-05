require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 8000;

//middleWare
app.use(cors())
app.use(express.json());

const {
    MongoClient,
    ServerApiVersion,
    ObjectId
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
        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            console.log(newProduct);
            const result = await productsClt.insertOne(newProduct);
            res.send(result);
        })
        // GET: get the all product from database
        app.get('/products', async (req, res) => {
            const cursor = productsClt.find();
            const result = await cursor.toArray();
            res.send(result)
        })
        //GET: get the data of category
        app.get('/products/category/:categoryName', async (req, res) => {
            const category = req.params.categoryName;
            const filter = {
                categoryName: category
            };
            const result = await productsClt.find(filter).toArray();
            res.send(result)
        })

        // GET: get the single data from database
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const filter = {
                _id: new ObjectId(id)

            };
            const result = await productsClt.findOne(filter);
            res.send(result)

        });
        // GET: get the product user email
        app.get('/products/email/:userEmail', async (req, res) => {
            const email = req.params.userEmail;
            const filter = {
                userEmail: email
            };
            const result = await productsClt.find(filter).toArray();
            res.send(result)
        })
        // create a database collaection for users 
        const usersClt = client.db('equipifyDB').collection('users');
        // POST: get the user data from client side and post to usersClt collection;
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await usersClt.insertOne(newUser);
            res.send(result);
        })
        //GET: get the user data from database
        app.get('/users', async (req, res) => {
            const cursor = usersClt.find();
            const result = await cursor.toArray();
            res.send(result)
        })
        //PUT: get the data for update from database
        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const updatedData = req.body;
            const result = await productsClt.updateOne({
                _id: new ObjectId(id)
            }, {
                $set: updatedData
            });
            res.send(result);
        })
        //DELETE: Delete the product from database
        app.delete('/products/:id', async(req, res)=>{
            const id = req.params.id;
            const deletedId = {
                _id: new ObjectId(id)
            };
            const result = await productsClt.deleteOne(deletedId);
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