const express = require('express')
require('dotenv').config();
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000


app.use(cors({

    origin:[ 'http://localhost:5173',
            'http://localhost:5174',
           ],
    credentials:true

}
))
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gx7mkcg.mongodb.net/?retryWrites=true&w=majority`;

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
        const users = client.db("RepliQ").collection("users");
        const products = client.db("RepliQ").collection("products");

        app.get('/users', async(req, res)=>{
            const result = await users.find().toArray()
            res.send(result)
          })

          app.post(`/users`, async(req, res)=>{
            const user = req.body
            const query = {mail : req?.body.mail} 
            const find = await users.findOne(query)
            if(find){
              return res.send  ({message: 'user already exists', insertedId : null})
            }
            const result = await users.insertOne(user)
            res.send(result)
          })


          app.get('/products', async(req, res)=>{
            const result = await products.find().toArray()
            res.send(result)
          })

          
          

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } finally {
    
      }
    }
    run().catch(console.dir);
    
    app.get('/', (req, res) => {
      res.send('boss is sitting')
    })
    
    
    app.listen(port, ()=>{
        console.log(`Landlord is sitting on port ${port} `)
    })
      