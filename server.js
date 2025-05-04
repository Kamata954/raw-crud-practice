const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://naruto:testpassword@cluster0.izrvhnw.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(uri)

client.connect()
.then(client => {
    console.log("connected to mongo")
    const db = client.db("anime-quotes")
    const quotesCollection = db.collection("quotes")

    app.use(express.urlencoded({extended : true}));

    app.listen(3000, () => {
        console.log('listening on port 3000');
    })

    app.get('/', (req,res) => {
        res.sendFile(__dirname + '/index.html');
    })

    app.post('/quotes', (req,res) => {
        quotesCollection
            .insertOne(req.body)
            .then(result => {
                console.log(result);
                res.redirect("/");
            })
            .catch(err => console.error(err))
    })
})
.catch(err => console.error(err))



