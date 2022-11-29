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

async function run() {
    try {
        await client.connect();
        const userCollection = client.db("elearning").collection("users");

        app.post('/user', (req, res) => {
            const newUser = req.body;
            console.log('User:  ', newUser)
            res.send({result: 'Data post'});
        });

    }
    finally {
        //
    }
}

run().catch(console.dir);

app.get('/', (req,res) => {
    res.send('Running');
});


app.listen(port, () => {
    console.log('Server running');
})