const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const db = mongoose.connection;
const dbURI = 'mongodb+srv://gsnagc5022:vEDXnzO3VLbGcams@cluster0.vvbf9pt.mongodb.net/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
db.once('open', () => console.log('Connected to Database'));
app.use(express.json());
// using cors to allow cross origin resource sharing
const cors = require('cors');
// app.use(cors());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// using body-parser to parse JSON bodies into JS objects
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/postFillData', async (req, res) => {
    const data = req.body;
    console.log(data);

    try{
        const emptyCollection = await db.collection('FillData').deleteMany({});

        try {
            const result = await db.collection('FillData').insertOne(data);
            console.log(`Inserted document with _id: ${result.insertedId}`);
            res.send('Data inserted successfully');
          } catch (error) {
            console.error(error);
            res.send('Internal Server Error');
          }    
    }
    catch(error){
        console.error(error);
        res.send('Internal Server Error');
    }
  });

app.get('/getFillData', async (req, res) => {
    try{
        const data = await db.collection('FillData').findOne({});
        res.send(data);
    }
    catch(error){
        console.error(error);
        res.send('Internal Server Error');
    }
});

app.post('/postSubmitData', async (req, res) => {
    const data = req.body;
    console.log(data);

    try{
        const emptyCollection = await db.collection('SubmitData').deleteMany({});

        try {
            const result = await db.collection('SubmitData').insertOne(data);
            console.log(`Inserted document with _id: ${result.insertedId}`);
            res.send('Data inserted successfully');
          } catch (error) {
            console.error(error);
            res.send('Internal Server Error');
          }    
    }
    catch(error){
        console.error(error);
        res.send('Internal Server Error');
    }
  });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}
);
