const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

//
app.use(cors());
app.use(express.json());


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.krpkhzs.mongodb.net/?retryWrites=true&w=majority`;

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
   client.connect();
    const toysCollection = client.db("toyDb").collection("Toy");
    const toysAddCollection = client.db("toyDb").collection("toyAdd");
   

    app.get("/toys", async (req, res) => {
      const toy= toysCollection.find();
      const result = await toy.toArray();
      res.send(result);
    });

  //  add toys

  app.get("/toysAdd", async (req, res) => {
    const toy= toysAddCollection.find();
    const result = await toy.toArray();
    res.send(result);
  });


  app.post("/toysAdd", async(req, res) => {
    const items = req.body;
    const cursor= await toysAddCollection.insertOne(items)
    res.send(cursor)
  });

// Toy details

app.get("/toys/:id", async (req, res) => {
  console.log(req.params.id);
  const toy = await toysAddCollection.findOne({
    _id: new ObjectId(req.params.id),
  });
  res.send(toy);
});




  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("toy hunter is running");
});

app.listen(port, () => {
  console.log(`Toy hunter server Running${port}`);
});