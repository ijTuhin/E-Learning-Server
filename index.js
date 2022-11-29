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
        const buycourseCollection = client.db("elearning").collection("buycourse");
        const courseCollection = client.db("elearning").collection("courses");
        const allcourseCollection = client.db("elearning").collection("allcourses");

        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('User:  ', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        });
        app.post('/buycourse', async (req, res) => {
            const newCourse = req.body;
            console.log('User:  ', newCourse);
            const result = await buycourseCollection.insertOne(newCourse);
            res.send(result);
        });

        app.get('/allcourses', async (req,res) => {
            const query = {};
            const cursor = allcourseCollection.find(query);
            const allcourses = await cursor.toArray();
            res.send(allcourses);
        });
        app.get('/courses', async (req,res) => {
            const query = {};
            const cursor = courseCollection.find(query);
            const courses = await cursor.toArray();
            res.send(courses);
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