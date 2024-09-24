import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from "mongodb";

const app= express();
app.use(express.json());
app.use(cors());
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
const PORT =process.env.PORT;

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
  }
  export const client = await createConnection();
app.get('/',function (req,res){
    res.send("Hello World");
});

app.get('/products',async function (req,res){
    try{
        const products= await client.db('ecomlanding').collection('products').find(req.query).toArray();
        res.send(products);
    }catch(ex){
        console.log("Exception is " ,ex);
    }

})

app.listen(PORT,()=>console.log(`App Started in ${PORT}`));