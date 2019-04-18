const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const bodyParser = require("body-parser")
const monk = require('monk')
const cors = require('cors')
// const MongoClient = require("mongodb").MongoClient
// const ObjectId = require("mongodb").ObjectID
// All of the instances within the url it is called gearList that is the name of the database cluster
const url = 'mongodb://clintse:clintspassword@gearlist-shard-00-00-nroed.mongodb.net:27017,gearlist-shard-00-01-nroed.mongodb.net:27017,gearlist-shard-00-02-nroed.mongodb.net:27017/gearList?ssl=true&replicaSet=gearList-shard-0&authSource=admin&retryWrites=true'
// const url= 'mongodb+srv://clintse:clintspassword@gearlist-nroed.mongodb.net/test?retryWrites=true'
app.use(cors())
const db = monk(url);
db.then(() => {
  console.log('Connected correctly to server')
})

//gear is what monk is getting, the name of the document it's on the line below
const collection = db.get('gear')

app.use(bodyParser.json())
//get all entries
app.get('/', async (req, res) => {
    const result= await collection.find({})
    return await res.status(200).send(result)
})
app.get('/category/:category', async (req, res) =>{
    const result = await collection.find({category: req.params.category}, {})
    return res.status(200).send(result)
})

//get one by id 
app.get('/:id', async (req, res) =>{
    // console.log("you found me")
    //I put the result in to an array  so that it would cancel out the array that it comes in This is called Destructuring!!!
    const [result] = await collection.find(req.params.id)
    return res.status(200).send(result)
})
//get one by catagory

//post a new entry maybe not getting the data through
app.post('/', async (req, res)=>{
    // console.log(req.body)
    const result = await collection.insert(req.body)
    return res.status(200).send(result)

})
//delete one entry by id
app.delete('/gearlist/', async (req, res)=>{
    console.log(req.body)
    await collection.findOneAndDelete(req.body)
    return res.status(200).send(await collection.find())    
})
//Not working yet
// app.delete('/:id', async (req, res)=>{
//     await collection.findManyAndDelete(req.params.id)
//     return res.status(200).send(await collection.find()) 
// })

//update by id
app.put('/gearlist/:id', async (req, res)=>{
    console.log(req.body)
    const result = await collection.findOneAndUpdate(req.params.id, req.body)
   return res.status(200).send(result)
})
   
app.listen(port, () => console.log(`Example app listening on port ${port}!`))