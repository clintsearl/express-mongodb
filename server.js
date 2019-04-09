const express = require('express')
const app = express()
const port = 4000
const bodyParser = require("body-parser")
const monk = require('monk')
const MongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectID
//All of the instances within the url it is called gearList that is the name of the database 
 
const url = 'mongodb://clintse:clintspassword@gearlist-shard-00-00-nroed.mongodb.net:27017,gearlist-shard-00-01-nroed.mongodb.net:27017,gearlist-shard-00-02-nroed.mongodb.net:27017/gearList?ssl=true&replicaSet=gearList-shard-0&authSource=admin&retryWrites=true'
const db = monk(url);

db.then(() => {
  console.log('Connected correctly to server')
})
//gear is what monk is getting, the name of the document it's on the line below
const collection = db.get('gear')

app.use(bodyParser.json())

app.get('/', async (req, res) => {
    const result= await collection.find({})
    return res.status(200).send(result)})


app.post('/', async (req, res)=>{
    const result = await collection.insert(req.body)
    res.status(200).send(result)

})

app.delete('/', async (req, res)=>{
    await collection.findOneAndDelete(req.body)
    return res.status(200).send(await collection.find())    
// }).catch((err)=>{
//     console.log(err)
})


// collection.insert([])
// .then((doc) =>{
//    doc.stringify()
// }).catch((err)=>{   
// }).then(()=>db.close())
   
app.listen(port, () => console.log(`Example app listening on port ${port}!`))