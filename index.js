const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// using middleware
app.use(cors());
app.use(express.json());

// userName: dbuser
// password: s5qpYxyO6JvdKBk1


const uri = "mongodb+srv://dbuser:s5qpYxyO6JvdKBk1@cluster0.hfup90w.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('DB connected');
  // perform actions on the collection object
  client.close();
});



app.get('/', (req,res) => {
    res.send('Running');
});

app.listen(port, () => {
    console.log('Server running');
})