const express = require('express')
const cors = require('cors')
const app = express();

require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors())

app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://styleshere:AMHegTImnieDUulR@cluster0.jt15atw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
     serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
     }
});



async function run() {
     //   try {
     // Connect the client to the server	(optional starting in v4.7)

     // await client.connect();

     const productCollection = client.db("Styleshere").collection("product");
     const AddcardCollection = client.db("Styleshere").collection("addCard");


     // productCollection related Api 

     app.get('/product', async (req, res) => {
          const result = await productCollection.find().toArray();
          res.send(result)
     })
     app.get('/product/:category', async (req, res) => {
          const category = req.params.category;
          const query = { category: category }

          const result = await productCollection.find(query).toArray();
          res.send(result)
     })

     app.get('/product/addcard/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) }
          const result = await productCollection.findOne(query);
          res.send(result)
     })
     // AddcardCollection Related Api 
     app.post('/addcard', async (req, res) => {
          const body = req.body;
          const data = body.AddCardData
          const result = await AddcardCollection.insertOne(data);
          res.send(result);
     })

     app.get('/addcard', async (req, res) => {
          const result = await AddcardCollection.find().toArray();
          res.send(result);
     })

     app.get('/addcard/:email', async (req, res) => {
          const email = req.params.email;
          const query = { email: email }
          const result = await AddcardCollection.find(query).toArray()
          res.send(result);
     })

     app.get('/addcard/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id:ObjectId(id)}
          const result = await AddcardCollection.findOne(query)
          res.send(result);
     })

     app.delete('/addcard/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) };
          const result = await AddcardCollection.deleteOne(query);
          res.send(result)
     })


     await client.db("admin").command({ ping: 1 });
     console.log("Pinged your deployment. You successfully connected to MongoDB!");
     //   } finally {
     //     // Ensures that the client will close when you finish/error
     //     await client.close();
     //   }


}
run().catch(console.dir);




app.get('/', async (req, res) => {
     res.send("hello world ")
})

app.listen({ port }, function () {
     console.log(`  Server is Running  ${port}`)
})
