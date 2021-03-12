const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

//initailize mongoDB
mongoose.connect(
    process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
}). then(() => console.log('DB Connected'));

//define mongo model
// const Items = mongoose.model("items", new mongoose.Schema({
//     id: {type: String, default: shortid.generate},   //this is the new id
//     image: String,
//     artistName: String,
//     seat: String,
//     venue: String,
//     city: String,
//     state: String,
//     sellerName: String,
//     sellerContact: String,
//     price: Number,
//     genre: String,
//     concertDate: String,
//     artistImage: String
// })
// );

// app.get("/api", async (req, res) => {
//     const items = await Items.find({});
//     res.send(items);
// });

// app.post("/api", async (req,res) => {
//     const newItem = new Items(req.body);
//     const saveItem = await newItem.save();
//     res.send(saveItem);
// });

// app.delete("/api/:id", async(req, res) => {
//     const deleteItem = await Item.findByIdAndDelete(req.params.id);
//     res.send(deleteItem);
// })

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
